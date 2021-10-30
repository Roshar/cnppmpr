<template>
    <div class="col-3">
        <admin-library-menu></admin-library-menu>
    </div>
    <div class="col-9">
        <div class="content-wallpaper">
            <h4 class="title-page"> Библиотека событий</h4>
            <hr>
            <h5 class="subtitle-page">Отсортировать по параметрам </h5>
            <div class="row">
                <div class="col-6">
                    <label > Категория</label>
                    <select class="form-control" name="tag" v-model="category">
                        <option value="0">Выбрать категория</option>
                        <option v-for="(item, index) in tag" :key="item.id_tag" :value="item.id_tag">{{item.title_tag}}</option>
                    </select>
                </div>
                <div class="col-6">
                    <label > Предмет</label>
                    <select class="form-control" name="discipline" v-model="discipline_value">
                        <option value="0">Выбрать предмет</option>
                        <option v-for="(item, index) in disciplines" :key="item.id_dis" :value="item.id_dis">{{item.title_discipline}}</option>
                    </select>
                </div>
            </div>
            <hr>
        </div>
        <div class="row">
            <div class="col-12">
                <app-loader v-if="loading"></app-loader>
                <div class="content-wallpaper" v-else>
                    <div class="row">
                        <div class="col-4"> <h5 >Список материалов</h5></div>
                        <div class="col-4"> <span>Общее количество: {{countNum}}</span></div>
                    </div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col" style="width: 3%" >№</th>
                                <th scope="col" style="width: 15%">Наименование</th>
                                <th scope="col" style="width: 15%">Описание</th>
                                <th scope="col" style="width: 20%">Предмет</th>
                                <th scope="col" style="width: 15%">Категория</th>
                                <th scope="col" style="width: 7%">Дата создания</th>
                                <th scope="col" style="width: 5%">Изменить</th>
                                <th scope="col" style="width: 5%">Удалить</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in library" :key="item.id">
                            <th scope="row">{{index+1}}</th>
                            <td> <router-link :to="{path:`/global_library/${item.id}`}">{{item.title}}</router-link></td>
                            <td>{{item.description}}</td>
                            <td>{{item['title_discipline']}}</td>
                            <td>{{item['title_tag']}}</td>
                            <td>{{item['created_date']}}</td>
                            <td>
                                <div style="text-align: center" @click="editItem(item.id)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                    </svg>
                                </div>
                            </td>
                            <td>
                                <div style="text-align: center" @click="deleteItem(item.id)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </svg>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getDateCurrent} from '../../../utils/getDateCurrent'
    import {ref, onMounted, computed, watch} from 'vue'
    import {useStore} from 'vuex'
    import {useRouter} from 'vue-router'
    import AppLoader from "../../../components/ui/AppLoader";
    import AdminLibraryMenu from "../../../components/adminMenu/AdminLibraryMenu";
    export default {
        setup() {
            const store = useStore()
            const router = useRouter()
            const loading = ref(true)
            const search = ref(false)
            const discipline_value = ref("0")
            const tag = ref()
            // LIBRARY DATA
            const currentTime = ref()
            const disciplines = ref()
            const library = ref()
            const countNum = ref(0)
            const deactivation = ref(false)
            const category = ref("0")


            watch([ category, discipline_value], async (values) => {
                if(values[0] !== '0' || values[1] !== '0' ) {
                    await store.dispatch('globalLibrary/getLibraryDataWithFilter',
                        {
                            disId: discipline_value.value,
                            tagId: category.value,
                        })
                    library.value = store.getters['globalLibrary/getLibraryData']
                    countNum.value = library.value.length ? library.value.length : 0
                }else {
                    await store.dispatch('globalLibrary/getLibraryData')
                    library.value = store.getters['globalLibrary/getLibraryData']
                    countNum.value = library.value.length ? library.value.length : 0
                }
            })

            const deleteItem = async (id) => {
                await store.dispatch('globalLibrary/deleteLibraryById',{id})
                await store.dispatch('globalLibrary/getLibraryData')
                library.value = store.getters['globalLibrary/getLibraryData']
                countNum.value = library.value.length ? library.value.length : 0
                await router.push('/global_library')
            }

            const editItem = (id) => {
                router.push(`/global_library/edit/${id}`)
            }

            onMounted(async()=>{
                loading.value = true
                disciplines.value = await store.dispatch('discipline/getDisciplines')
                await store.dispatch('globalLibrary/getLibraryData')
                library.value = store.getters['globalLibrary/getLibraryData']
                await store.dispatch('tag/getTag')
                tag.value = store.getters['tag/getTags']
                countNum.value = library.value.length ? library.value.length : 0
                loading.value = false
            })


            currentTime.value = getDateCurrent()
            return {
                currentTime,
                loading,
                search,
                disciplines,
                discipline_value,
                library,
                deactivation,
                category,
                deleteItem,
                countNum,
                tag,
                editItem
            }
        },
        components: {AppLoader,AdminLibraryMenu}
    }
</script>

<style scoped>
    .content-wallpaper, .student-menu {
        margin-top: 1.5rem;
        background-color: white;
        color: #5d5d5d;
    }
    .content-wallpaper {
        padding: 25px;
    }
    .name_student_link {
        color: #2a5885;
    }
    .name_student_link:hover {
        color: #2a5885;
        font-weight: bold;
        text-decoration: none;
    }
    .title-page {
        color: #4571a3;
    }
    .bi-trash {
        color: tomato;
    }
    .bi-trash:hover{
        color: #ff3814;
        cursor: pointer;
    }
    .bi-pencil-square {
        color:#ffb347
    }
    .bi-pencil-square:hover {
        color:#fa9200
    }

    .bi-person-x-fill {
        color: tomato;
    }
    .bi-person-x-fill:hover{
        color: #ff3814;
        cursor: pointer;
    }
    .center-content {
        width: 50%;
        margin: 0 auto;
    }
    .inside-block-indent {
        margin:10px 0 10px 0;
    }
    .btn-primary-outline {
        background-color: transparent;
        border:1px solid rgba(69, 113, 163, 0.4) ;
        padding:8px 25px;
        color: #4571a3;
        box-sizing: border-box;
        width:100%;

    }
    .btn-primary-outline:hover {
        border-color:#4571a3;
        text-decoration: none;

    }
    .btn-danger-outline {
        background-color: transparent;
        border:1px solid rgba(255, 99, 71, 0.4);
        padding:8px 25px;
        color: tomato;
        box-sizing: border-box;
        width:100%;
    }

    .btn-danger-outline:hover {
        border-color:tomato
    }



</style>