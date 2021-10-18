<template>
    <div class="col-3">
        <div class="student-menu">
            <nav class="colorlib-main-menu" role="navigation">
                <ul class="navbar-menu">
                    <li><router-link to="/students"  class="router-link" href="#">Обучающиеся</router-link></li>
                    <li><router-link to="/group"  class="router-link " href="#">Учебные группы</router-link></li>
                    <li><router-link to="/ban"  class="router-link" href="#"> Заблокированные </router-link></li>
                </ul>
            </nav>
        </div>
    </div>
    <div class="col-9">
        <div class="content-wallpaper">
            <div class="modal-form" v-if="showModal">
                <form @submit.prevent="onSubmit" id="form">
                    <div class="form-group">
                        <label for="title">Название группы</label>
                        <input type="text" :class="['form-control',{invalid:titleError}]" v-model="title"  id="title"  placeholder="Введите название группы">
                        <small v-if="titleError">{{titleError}}</small>
                    </div>
                    <div class="form-group">
                        <label for="description">Краткое описание:</label>
                        <textarea :class="['form-control',{invalid:descriptionError}]" id="description" v-model="description"  name="description" placeholder="Здесь вы можете добавить краткое описание"></textarea>
                        <small v-if="descriptionError">{{descriptionError}}</small>
                    </div>
                    <div class="form-group">
                        <label>Тьютор</label>
                        <select :class="['form-control',{invalid:tutorError}]" name="tutor" v-model="tutor">
                            <option value=''>Выбрать из неназначенных тьюторов</option>
                            <option v-if="tutorsData" v-for="(item, index) in tutorsData"  :key="item.id"  :value=item.user_id>{{item.name}} {{item.surname}} {{item.patronymic}}</option>
                        </select>
                        <small v-if="tutorError">{{mentorError}}</small>
                    </div>
                    <button type="submit"  class="btn btn-primary"  :disabled="isSubmiting">Создать группу</button>
                    <button type="button"  class="btn btn-info" @click="showModal=false" >Отменить</button>
                </form>
            </div>
            <h4 class="title-page">Учебные группы</h4>
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
            <div class="row">
                <div class="col-4" v-for="(item, index) in groupsData" :key="item.id">
                    <div class="card">
                        <div class="card-body">
                            <div style="color: rgb(211, 211, 211); padding-bottom:10px"> Дата создания: {{item.created_at}}</div>
                            <h5 class="card-title">{{item.title}}</h5>
                            <h6 class="card-subtitle mb-2 text-muted" style="padding-bottom:5px">Тьютор: {{item.surname}} {{item.name}} {{item.patronymic}}</h6>
                            <h6 class="card-subtitle mb-2 text-muted" >Предмет: {{item.title_discipline}} </h6>
                            <p class="card-text">{{item.description}}</p>
                            <router-link :to="{path:`/group/${item.id}`}" class="btn-primary-outline" >Открыть</router-link>
                            <button class="btn-danger-outline">Удалить</button>
                        </div>
                    </div>
                </div>
            </div>

            <hr>

        </div>
    </div>
    <transition  name="fade" appear>
        <div class="modal-overlay" v-if="showModal" @click="showModal = false">
        </div>
    </transition>
</template>

<script>

    import {ref, onMounted, computed, watch} from 'vue'
    import {useStore} from 'vuex'
    import {useRouter} from 'vue-router'
    import AppLoader from "../../../components/ui/AppLoader";
    import {useGroupForm} from "../../../use/admin/group-form";

    export default {
        setup() {
            const store = useStore()
            const router = useRouter()
            const loading = ref(true)
            const showModal = ref(false)
            const tutorsData = ref()
            const groupsData = ref()



            onMounted(async()=>{
                loading.value = true
                // TUTORS DATA
                tutorsData.value = await store.dispatch('admin/getTutorAndCheckAtFree')
                groupsData.value = await store.dispatch('admin/getGroups')
                loading.value = false
            })

            const submit = async(values) => {
                await store.dispatch('admin/createGroup', values)
                tutorsData.value = await store.dispatch('admin/getTutorAndCheckAtFree')
                groupsData.value = await store.dispatch('admin/getGroups')
                showModal.value = false
                await router.push('/group')

            }

            return {
                ...useGroupForm(submit),
                loading,
                showModal,
                tutorsData,
                groupsData

            }
        },
        components: {AppLoader}
    }
</script>

<style scoped>
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
    .center-content {
        width: 50%;
        margin: 0 auto;
    }
    .inside-block-indent {
        margin:10px 0 10px 0;
    }

    .colorlib-main-menu {
        background-color: white;
        width: 100%;
    }
    .colorlib-main-menu ul {
        list-style-type: none;
        width: 100%;
        padding: 0;
    }

    .colorlib-main-menu ul li .router-link {
        display: block;
        padding: 20px;
        text-align: center;
        color: #4571a3;

    }
    .colorlib-main-menu ul li .router-link:hover {
        text-decoration: none;
        background-color:rgba(192,192,192,0.1);
        border-right: rgba(192,192,192,0.3) solid 5px;
    }

    .colorlib-main-menu ul li .active {
        text-decoration: none;
        background-color:rgba(192,192,192,0.1);
        border-right: rgba(192,192,192,0.3) solid 5px;
        color: #4571a3;
        font-weight: 500;
    }

</style>