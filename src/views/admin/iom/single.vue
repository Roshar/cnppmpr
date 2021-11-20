<template>
    <div class="col-3">
        <admin-iom-menu1 :iomData="iomData" ></admin-iom-menu1>
    </div>
    <div class="col-9">
        <div class="content-wallpaper" v-if="iom">
            <h4 class="title-page">{{title}} </h4>
            <div class="card single_post">
                <div class="content-wallpaper">
                    <div class="body">
                        <h5>Описание</h5>
                        <p v-if="description" v-html="description"></p>
                        <p v-else>Пусто</p>
                        <hr>
                        <h5>Предмет</h5>
                        <p>{{discipline}}</p>
                        <hr>
                        <h5>Общее количество слушателей, проходящих обучение </h5>
                        <p v-if="countStudents"> {{countStudents}} чел.</p>
                        <p v-else> 0 </p>

                    </div>
                </div>
            </div>
        </div>
        <div class="content-wallpaper">
            <h4 class="title-page">Содержание</h4>
            <hr>
            <div class="search-students" v-if="iom">
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">№</th>
                        <th scope="col">Наименование</th>
                        <th scope="col">Описание</th>
                        <th scope="col">Ссылка</th>
                        <th scope="col">Автор</th>
                        <th scope="col">Категория</th>
                        <th scope="col">Срок выполнения</th>
                        <th scope="col">Посмотреть</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in exData">
                            <th scope="row">{{index+1}}</th>
                            <td>{{item.title}}</td>
                            <td>{{shortContent(clearHTML(item.description))}}</td>
                            <td>{{item.link}}</td>
                            <td>{{currentMentor(item.mentor)}}</td>
                            <td>{{item['title_tag']}}</td>
                            <td>{{checkTerm(item['term'], item['term'])}}</td>
                            <td>
                                <router-link :to="{ path: `/iom/${item['iom_id']}/${tutorId}/${item['id_exercises']}`}" class="btn-primary-outline" >Открыть</router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import {shortContent} from "../../../utils/shortContent";
    import {clearHTML} from "../../../utils/clearHTML";
    import {ref, onMounted, computed, watch} from 'vue'
    import {useStore} from 'vuex'
    import {useRouter, useRoute} from 'vue-router'
    import {checkTerm} from '../../../utils/checkTerm'
    import AppLoader from "../../../components/ui/AppLoader";
    import AdminIomMenu1 from "../../../components/adminMenu/AdminIomMenu1";
    export default {
        setup() {
            const store = useStore()
            const route = useRoute()
            const loading = ref(true)
            const title = ref()
            const tutorId = ref()
            const description = ref()
            const discipline = ref()
            const author = ref()
            const link = ref()
            const countStudents = ref(0)
            const iom = ref()
            const exData = ref()
            const iomData = ref()

            const currentMentor = (val) => {
                if(val === 0) {
                    return 'Тьютор'
                }else {
                    return 'Ментор'
                }
            }


            onMounted(async()=>{
                loading.value = true
                const data = await store.dispatch('admin/getDataFromIOM',{
                    iomId:route.params.id,
                    tutorId:route.params.tutor,
                })
                if(data.length) {
                    iom.value = true
                    title.value = data[0][0]['title']
                    description.value = data[0][0]['description']
                    link.value = data[0][0]['link']
                    tutorId.value = data[1][0]['user_id']
                    author.value = data[1][0]['surname'] + ' '+data[1][0]['name']
                    discipline.value = data[1][0]['title_discipline']
                    exData.value = data[2]
                    countStudents.value = data[3][0]['id']
                    iomData.value = {
                        iom: route.params.id,
                        tutorId: route.params.tutor,
                        author: author.value,
                        single: true
                    }
                }
                console.log(data)

                loading.value = false
            })


            return {

                loading,
                iom,
                title,
                description,
                discipline,
                author,
                link,
                exData,
                iomData,
                tutorId,
                countStudents,
                currentMentor,
                checkTerm,
                shortContent,
                clearHTML
            }
        },
        components: {AppLoader,AdminIomMenu1}
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
    .title-page {
        color: #4571a3;
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