<template>
    <div class="col-3">
        <TutorMainMenu></TutorMainMenu>
    </div>
    <div class="col-9">
        <div class="content-wallpaper">
            <div class="modal-form" v-if="showModal">
                <form  @submit.prevent ref="form">
                    <div class="form-group">
                        <label for="titleIom">Наименование</label>
                        <input type="text" :class="['form-control',invalid.titleIomInvalid]" v-model="titleIom" id="titleIom" name="titleIom"  placeholder="Введите название индивидуального образовательного маршрута">
                        <small id="titleIomHelp" class="form-text text-muted">Обязательное поле</small>
                    </div>
                    <div class="form-group">
                        <label for="descriptionIom">Краткое описание:</label>
                        <textarea class="form-control" v-model="descriptionIom"  id="descriptionIom" name="descriptionIom" placeholder="Здесь вы можете добавить краткое описание"></textarea>
                        <small id="descriptionIomHelp" class="form-text text-muted">Необязательное поле</small>
                    </div>
                    <div class="row">
                        <div class="col-10"><button type="button"  class="btn btn-outline-primary-send" @click="addIom" >Создать и перейти в ИОМ</button></div>
                        <div class="col-2"><button type="button" style="float: right" class="btn btn-outline-secondary"  @click="showModal=false" >Отменить</button></div>
                    </div>
                </form>
            </div>
            <h4 class="title-page">Моя библиотека индивидуальных образовательных маршрутов</h4>
            <app-loader v-if="loading"></app-loader>
            <div class="content-loader" v-else>
                <hr>
                <div class="row">
                    <div class="col-6">
                        <div class="create_iom">
                            <div class="create_iom_block">
                                <div class="create_iom_block_icon_create" @click="showModal = true">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" class="bi bi-folder-plus" viewBox="0 0 16 16">
                                        <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z"/>
                                        <path d="M13.5 10a.5.5 0 0 1 .5.5V12h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V13h-1.5a.5.5 0 0 1 0-1H13v-1.5a.5.5 0 0 1 .5-.5z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h5 class="subtitle-page">Список </h5>
                <hr>

                <div class="row" v-if="iomData">
                    <div class="col-4" v-for="(item, index) in iomData" :key="item.id">
                        <div class="card">
                            <div class="card-body">
                                <div style="color: rgb(211, 211, 211); padding-bottom:10px"> Дата создания:  {{item['created_at']}}</div>
                                <h5 class="card-title">{{item.title}}</h5>
                                <h6 class="card-subtitle mb-2 text-muted" style="padding-bottom:5px">Количество заданий: {{item.countExercises}}</h6>
                                <router-link :to="{ path: `/my_iom/${item['iom_id']}/exercise`}" class="btn-primary-outline" >Открыть</router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <h5 v-if="iomData.length == 0">Ваша библиотека пуста</h5>
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
            let invalid = ref({
                titleIomInvalid: '',
                titleExInvalid: '',
            })
            const addIom = async() => {
                if(!titleIom.value ||titleIom.value.length<3 ){
                    invalid.value.titleIomInvalid = "is-invalid"
                }else {
                    await store.dispatch('iom/addNewIom',{
                        title:titleIom.value,
                        description:descriptionIom.value
                    })
                }
            }


            onMounted(async()=>{
                loading.value = true
                await store.dispatch('iom/getData',token)
                loading.value = false
            })
            return{
                iomData: computed(() => store.state['iom'].iomData),
                route,
                loading,
                addIom,
                invalid,
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