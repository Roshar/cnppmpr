<template>
    <div class="col-3">
        <admin-library-menu></admin-library-menu>
    </div>
    <div class="col-9">
        <div class="content-wallpaper">
            <h4 class="title-page"> Создать новый материал</h4>
            <hr>
            <form @submit.prevent="onSubmit">
                <div class="row">
                    <div class="col-12">
                        <label > Наименование</label>
                        <input type="text" class="form-control" id="title" name="title" v-model="title" >
                        <small v-if="titleError" style="color:tomato">Обязательное поле</small>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <label > Содержание (описание)</label>
                        <ckeditor :editor="editor" v-model="description" :config="editorConfig"></ckeditor>

                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <label > Ссылка</label>
                        <input type="text" class="form-control" name="link" v-model="link">

                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <label > Категория</label>
                        <select class="form-control"  id="category" name="category" v-model="category">
                            <option value="">Выбрать категория</option>
                            <option v-for="(item, index) in tag" :key="item.id_tag"
                                    :value="item.id_tag">{{item.title_tag}}</option>
                        </select>
                        <small v-if="tagError"  style="color:tomato">Обязательное поле</small>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <label > Предмет</label>
                        <select class="form-control" name="discipline" id="discipline" v-model="discipline">
                            <option value="">Выбрать предмет</option>
                            <option v-for="(item, index) in disciplines" :key="item.id_dis"
                                    :value="item.id_dis">{{item.title_discipline}}</option>
                        </select>
                        <small v-if="disError"  style="color:tomato">Обязательное поле</small>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <label > Уровень</label>
                        <select class="form-control" name="level_iom"  v-model="level">
                            <option value="">Выбрать уровень</option>

                            <option v-for="(item, index) in levels" :key="item.id"
                                    :value="item.id">{{item.title}}
                            </option>
                        </select>
                        <small v-if="levelError"  style="color:tomato">Обязательное поле</small>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-4"><button type="button" @click="updateItem('save')" class="btn btn-primary-outline" >Изменить</button></div>
                    <div class="col-4"><button type="button" @click="updateItem('redirect')" class="btn btn-primary-outline" >Изменить и закрыть</button></div>
                    <div class="col-4"><button type="button" @click="updateItem('cancel')" class="btn btn-primary-outline" >Отмена</button></div>
                </div>
                <hr>
            </form>
        </div>
    </div>
</template>

<script>
    import {getDateCurrent} from '../../../utils/getDateCurrent'
    import {ref, onMounted, computed, watch} from 'vue'
    import {useStore} from 'vuex'
    import {useRouter, useRoute} from 'vue-router'
    import AppLoader from "../../../components/ui/AppLoader";
    import AdminLibraryMenu from "../../../components/adminMenu/AdminLibraryMenu";
    import {requiredForm} from "../../../utils/requiredForm";
    import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
    import {mysqlEscape} from '../../../utils/mysqlEscape'
    export default {
        setup() {
            const store = useStore()
            const router = useRouter()
            const route = useRoute()
            const loading = ref(true)
            const tag = ref()
            const data = ref()
            const id = ref()
            let title = ref()
            let description = ref()
            let link = ref()
            let category = ref()
            let discipline = ref()
            let level = ref()
            let levels = ref()
            // LIBRARY DATA
            const currentTime = ref()
            const disciplines = ref()
            const tagError = ref()
            const titleError = ref()
            const level_iom = ref()
            const disError = ref()
            const levelError = ref()
            const editor =  ClassicEditor
            const editorConfig = {
                toolbar: {
                    items: [
                        'heading', '|',
                        'alignment', '|',
                        'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
                        'link', '|',
                        'bulletedList', 'numberedList', 'todoList',
                        'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor', '|',
                        'code', 'codeBlock', '|',
                        'insertTable', '|',
                        'outdent', 'indent', '|',
                        'blockQuote', '|',
                        'undo', 'redo'
                    ],
                    shouldNotGroupWhenFull: true
                }
            }
            let error = ref({})
            let errorSchemaRequired = {
                title: true,
                category: true,
                discipline: true,
                level_iom: true,
            }

            let invalid = ref({
                title: 'title',
                tag: 'tag',
                discipline: 'discipline',
            })

            const load = async() => {
                disciplines.value = await store.dispatch('discipline/getDisciplines')
                levels.value = await store.dispatch('discipline/getLevels')
                await store.dispatch('tag/getTag')
                await store.dispatch('globalLibrary/getLibraryDataById',{id: route.params.id})
                data.value = store.getters['globalLibrary/getLibraryData']
                id.value = data.value[0].id
                title.value = data.value[0].title
                description.value = data.value[0].description
                category.value = data.value[0]['tag_id']
                discipline.value = data.value[0]['discipline_id']
                level.value = data.value[0]['level_id']
                link.value = data.value[0].link
                tag.value = store.getters['tag/getTags']
            }

            onMounted(async()=>{
                loading.value = true
                await load()
                loading.value = false
            })

            watch([title,category,discipline,level], (values) => {
                if(values[0] !== '') {
                    titleError.value = ''
                }else {
                    titleError.value = true
                }
                if(values[1] !== '') {
                    tagError.value = ''
                }else {
                    tagError.value = true
                }
                if(values[2] !== '') {
                    disError.value = ''
                }else {
                    disError.value = true
                }
                if(values[3] !== '') {
                    levelError.value = ''
                }else {
                    levelError.value = true
                }
            })

            const updateItem = async(status) => {
                if(status == 'cancel') {
                    await router.push('/global_library')
                }else{
                    requiredForm('input',errorSchemaRequired,error)
                    requiredForm('select',errorSchemaRequired,error)
                    tagError.value = error.value?.tag
                    titleError.value = error.value?.title
                    disError.value = error.value?.discipline
                    levelError.value = error.value?.level

                    if(Object.keys(error.value).length === 0) {
                        await store.dispatch('globalLibrary/updateInLibrary',{
                            id: id.value,
                            title: mysqlEscape(title.value),
                            description: mysqlEscape(description.value),
                            link: link.value,
                            category: category.value,
                            discipline: discipline.value,
                            level: level.value,
                        })
                        if(status == 'save') {
                            await load()
                            await router.push('/global_library/edit/'+id.value)
                        }else if(status == 'redirect') {
                            await router.push('/global_library/')
                        }
                    }

                    error.value = {}
                }

            }

            currentTime.value = getDateCurrent()
            return {
                currentTime,
                loading,
                disciplines,
                tag,
                id,
                link,
                updateItem,
                level_iom,
                title,
                levels,
                level,
                disError,
                titleError,
                tagError,
                description,
                category,
                discipline,
                errorSchemaRequired,
                invalid,
                editorConfig,
                levelError,
                editor
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
    .bi-person-x-fill {
        color: tomato;
    }
    .bi-person-x-fill:hover{
        color: #ff3814;
        cursor: pointer;
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