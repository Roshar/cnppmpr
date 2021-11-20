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
                        <h5>Ссылка</h5>
                        <p v-if="link" > <a :href="link">{{link}}</a></p>
                        <p v-else>Пусто</p>
                        <hr>
                        <h5>Категория</h5>
                        <p>{{category}}</p>
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
            const category = ref()
            const author = ref()
            const link = ref()
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
                const data = await store.dispatch('admin/getTask', {
                    iomId: route.params.id,
                    tutorId: route.params.tutor,
                    taskId: route.params.taskId,
                })
                const data2 = await store.dispatch('admin/getDataFromIOM',{
                    iomId:route.params.id,
                    tutorId:route.params.tutor,
                })
                if(data) {
                    iom.value = true
                    title.value = data.title
                    description.value = data.description
                    link.value = data.link
                    category.value = data['title_tag']
                    author.value = data2[1][0]['surname'] + ' '+data2[1][0]['name']
                    iomData.value = {
                        iom: route.params.id,
                        tutorId: route.params.tutor,
                        author: author.value,
                        task: true
                    }
                    console.log(iomData.value )
                }


                loading.value = false
            })


            return {
                iomData,
                loading,
                iom,
                title,
                category,
                description,
                discipline,
                author,
                link,
                exData,
                tutorId,
                currentMentor,
                checkTerm,

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