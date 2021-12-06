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
                    <input type="text" :class="['form-control',{invalid:titleError}]" @blur="titleBlur" name="title" v-model="title" >
                    <small v-if="titleError">{{titleError}}</small>
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
                    <input type="text" :class="['form-control',{invalid:linkError}]" @blur="linkBlur" name="link" v-model="link">
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <label > Категория</label>
                    <select :class="['form-control',{invalid:catError}]" name="category" v-model="category">
                        <option value="">Выбрать категория</option>
                        <option v-for="(item, index) in tag" :key="item.id_tag" :value="item.id_tag">{{item.title_tag}}</option>
                    </select>
                    <small v-if="catError">{{catError}}</small>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <label > Предмет</label>
                    <select :class="['form-control',{invalid:disError}]" name="discipline" v-model="discipline">
                        <option value="">Выбрать предмет</option>
                        <option v-for="(item, index) in disciplines" :key="item.id_dis" :value="item.id_dis">{{item.title_discipline}}</option>
                    </select>
                    <small v-if="disError">{{disError}}</small>
                </div>
            </div>
            <hr>
            <button type="submit" class="btn btn-primary-outline" :disabled="isSubmiting">Добавить</button>
            </form>
        </div>
    </div>
</template>

<script>
    import {getDateCurrent} from '../../../utils/getDateCurrent'
    import {ref, onMounted, computed, watch} from 'vue'
    import {useLibraryForm} from "../../../use/library-form";
    import {useStore} from 'vuex'
    import {useRouter} from 'vue-router'
    import AppLoader from "../../../components/ui/AppLoader";
    import AdminLibraryMenu from "../../../components/adminMenu/AdminLibraryMenu";
    import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
    import {mysqlEscape} from '../../../utils/mysqlEscape'
    export default {
        setup() {
            const store = useStore()
            const router = useRouter()
            const loading = ref(true)
            const tag = ref()
            // LIBRARY DATA
            const currentTime = ref()
            const disciplines = ref()
            const description = ref()
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
                    shouldNotGroupWhenFull: true,
                    link: {
                        // Automatically add target="_blank" and rel="noopener noreferrer" to all external links.
                        addTargetToExternalLinks: true,

                        // Let the users control the "download" attribute of each link.
                        decorators: [
                            {
                                mode: 'manual',
                                label: 'Downloadable',
                                attributes: {
                                    download: 'download'
                                }
                            }
                        ]
                    }
                }
            }

            onMounted(async()=>{
                loading.value = true
                disciplines.value = await store.dispatch('discipline/getDisciplines')
                await store.dispatch('tag/getTag')
                tag.value = store.getters['tag/getTags']
                loading.value = false
            })

            const onSubmit = async(values) => {
                values.link = (!values.link) ? '' : values.link
                values.description =  (!values.description) ? '' : mysqlEscape(description.value)
                await store.dispatch('globalLibrary/addInLibrary',{
                    values
                })
                await router.push('/global_library')
            }

            currentTime.value = getDateCurrent()
            return {
                ...useLibraryForm(onSubmit),
                currentTime,
                loading,
                disciplines,
                description,
                tag,
                editorConfig,
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