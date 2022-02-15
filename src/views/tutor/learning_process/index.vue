<template>
    <div class="col-3">
        <TutorMainMenu></TutorMainMenu>
    </div>
    <div class="col-9">
        <div class="content-wallpaper">
            <h4 class="title-page">Учебный процесс по индивидуальным образовательным маршрутам </h4>
            <app-loader v-if="loading"></app-loader>
            <div class="content-loader" v-else>
                <hr>
                <h5 class="subtitle-page">Список </h5>
                <div class="row" v-if="iomData">
                    <div class="col-4" v-for="(item, index) in iomData" :key="item.id">
                        <div class="card">
                            <div class="card-body">
                                <div style="color: rgb(211, 211, 211); padding-bottom:10px"> Дата создания:  {{item['created_at']}}</div>
                                <h5 class="card-title">{{item.title}}</h5>
                                <h6 class="card-subtitle mb-2 text-muted" style="padding-bottom:5px">Количество учащихся: {{item.countMembers}}</h6>
                                <router-link :to="{ path: `/learning_process/${item['iom_id']}`}" class="btn-primary-outline" >Открыть</router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <h5 v-if="iomData.length == 0">Пустой список</h5>
            </div>
        </div>
    </div>
    <transition  name="fade" appear>
        <div class="modal-overlay" v-if="showModal" @click="showModal=false">
        </div>
    </transition>

</template>
<script>
    import {useStore} from "vuex";
    import {useRoute} from 'vue-router'
    import {ref,computed,onMounted} from 'vue'
    import AppLoader from "../../../components/ui/AppLoader";
    import TutorMainMenu from "../../../components/tutorMenu/TutorMainMenu";

    export default {
        setup() {
            const store = useStore()
            const route = useRoute()
            const loading = ref(true)
            const showModal = ref(false)
            const token = localStorage.getItem('jwt-token')
            let titleIom = ref('')
            let descriptionIom = ref('')
            const iomData = ref()


            onMounted(async()=>{
                loading.value = true
                iomData.value = await store.dispatch('learning/getLearningIOM',{token:token})
                loading.value = false
            })
            return{
                iomData,
                route,
                loading,
                titleIom,
                descriptionIom,
                showModal,
            }
        },
        components: {AppLoader, TutorMainMenu}
    }
</script>

<style  scoped>


    .btn-outline-primary-send{
        color: #fff;
        background-color: #4571a3;
        border-color: #4571a3;
    }

    .modal-confirm .icon-box {
        width: 80px;
        height: 80px;
        margin: 0 auto;
        z-index: 9;
        text-align: center;
        border: none
    }
    .modal-confirm .icon-box svg {
        color: #f15e5e;
        font-size: 46px;
        display: inline-block;
        margin-top: 13px;
    }
    .modal-confirm .btn, .modal-confirm .btn:active {
        color: #fff;
        border-radius: 4px;
        background: #60c7c1;
        text-decoration: none;
        transition: all 0.4s;
        line-height: normal;
        min-width: 120px;
        border: none;
        min-height: 40px;
        border-radius: 3px;
        margin: 0 5px;
    }
    .modal-confirm .btn-secondary {
        background: #c1c1c1;
    }
    .modal-confirm .btn-secondary:hover, .modal-confirm .btn-secondary:focus {
        background: #a8a8a8;
    }
    .modal-confirm .btn-danger {
        background: #f15e5e;
    }
    .modal-confirm .btn-danger:hover, .modal-confirm .btn-danger:focus {
        background: #ee3535;
    }
    .modal-confirm .close {
        position: absolute;
        top: 15px;
        right: 12px;
    }
    .modal-confirm h4 {
        text-align: center;
        font-size: 26px;
        margin: 30px 0 -10px;
    }


    .modal-overlay,.modal-overlay2 {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 98;
        background-color: rgba(0,0,0, 0.5);
    }

    .modal-form{
        position: fixed;
        top: 27%;
        left: 50%;
        transform: translate(-50%,-27%);
        z-index: 99;
        width: 60%;
        /*max-width:400px;*/
        background-color: #edeef0;
        padding: 60px 60px;
    }

    .content-wallpaper, .tutor-left-main-menu {
        margin-top: 1.5rem;
        background-color: white;
        color: #5d5d5d;
    }
    .content-wallpaper {
        padding: 25px;
    }
    .title-page, .subtitle-page {
        color: #4571a3;
    }
    .create_iom {
        margin:60px 0 60px 0
    }
    .create_iom_block {
        display: flex;
        border:5px dotted #4571a3;
        width: 200px;
        align-items: center;
        justify-content: center;
    }
    .create_iom_block_icon_create {
        font-size: 92px;
        color: grey;
    }
    .btn-primary-outline {
        background-color: transparent;
        border:1px solid rgba(69, 113, 163, 0.4) ;
        padding:8px 25px;
        color: #4571a3;
        box-sizing: border-box;

    }
    .btn-primary-outline:hover {
        border-color:#4571a3;
        text-decoration: none;

    }
    .btn-danger-outline {
        background-color: transparent;
        border:1px solid rgba(255, 99, 71, 0.4);
        padding: 5px 25px;
        color: tomato;
        margin-left: 1em;
    }
    .btn-danger-outline:hover {
        border-color:tomato
    }

    .bi-folder-plus {
        color: #4571a3;
    }

</style>