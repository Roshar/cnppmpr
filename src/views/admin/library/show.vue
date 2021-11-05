<template>
    <div class="col-3">
        <admin-library-menu></admin-library-menu>
    </div>
    <div class="col-9">
        <div class="content-wallpaper">
            <h4 class="title-page">{{title}} </h4>
            <div class="card single_post">
                <div class="content-wallpaper">
                    <div class="body">
                        <h5>Описание</h5>
                        <p v-if="description" v-html="description"></p>
                        <p v-else>Пусто</p>
                        <hr>
                        <h5>Ссылка</h5>
                        <p v-if="link" > <a :href="link">{{link}}</a></p>
                        <p v-else>Пусто</p>
                        <hr>
                        <h5>Категория</h5>
                        <p>{{category}}</p>
                        <hr>
                        <h5>Предмет</h5>
                        <p>{{discipline}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {ref, onMounted, computed, watch} from 'vue'
    import {useStore} from 'vuex'
    import {useRouter, useRoute} from 'vue-router'
    import AppLoader from "../../../components/ui/AppLoader";
    import AdminLibraryMenu from "../../../components/adminMenu/AdminLibraryMenu";
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

            const load = async() => {
                await store.dispatch('tag/getTag')
                await store.dispatch('globalLibrary/getLibraryDataById',{id: route.params.id})
                data.value = store.getters['globalLibrary/getLibraryData']
                id.value = data.value[0].id
                title.value = data.value[0].title
                description.value = data.value[0].description
                category.value = data.value[0].title_tag
                discipline.value = data.value[0].title_discipline
                link.value = data.value[0].link
                tag.value = store.getters['tag/getTags']
            }

            onMounted(async()=>{
                loading.value = true
                await load()
                loading.value = false
            })


            return {
                loading,
                tag,
                id,
                link,
                title,
                description,
                category,
                discipline,
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