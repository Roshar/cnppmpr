<template>
    <div class="col-3">
        <admin-profile-menu></admin-profile-menu>
    </div>
    <div class="col-9">
        <div class="content-wallpaper">
            <div class="row">
                <div class="col-9">
                    <h4 class="title-page"> Наставники </h4>
                </div>
                <div class="col-3">
                    <button class="btn btn-outline-primary" @click="showModalAdd=true">Добавить</button>
                </div>
                <hr>
            </div>

        </div>
        <div class="row">
            <div class="col-12">
                <div class="modal-form" v-if="showModal">
                    <form  id="form">
                        <div class="row">
                            <div class="col-12">
                                <span style="float:right" @click="showModal=false"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                      <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                      <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                                      </svg>
                                </span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="message_element">Фамилия</label>
                            <input type="text" class="form-control" name="singleSurname" v-model="singleSurname">
                        </div>
                        <div class="form-group">
                            <label class="message_element">Имя</label>
                            <input type="text" class="form-control" name="singleName" v-model="singleName">
                        </div>
                        <div class="form-group">
                            <label class="message_element">Отчество</label>
                            <input type="text" class="form-control" name="singlePatronymic" v-model="singlePatronymic">
                        </div>
                        <div class="form-group">
                            <label > Предмет</label>
                            <select class="form-control" name="discipline" v-model="id_dis">
                                <option value="">Выбрать предмет</option>
                                <option v-for="item in disciplines" :key="item['id_dis']" :value="item['id_dis']">{{item['title_discipline']}}</option>
                            </select>
                        </div>
                        <input type="hidden" class="form-control" name="singleId" v-model="singleId">
                        <button type="button"  class="btn btn-outline-primary-send" @click="editItem(singleId,singleSurname,singleName,singlePatronymic,id_dis)">Сохранить</button>
                        <router-link to="/mentor" class="message_element_active" @click="showModal = false" style="float:right;  text-decoration: underline;"> Отмена</router-link>
                    </form>
                </div>
                <div class="modal-form" v-if="showModalAdd">
                    <form  id="form2">
                        <div class="row">
                            <div class="col-12">
                                <span style="float:right" @click="showModalAdd=false"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                      <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                      <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                                      </svg>
                                </span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="message_element">Фамилия</label>
                            <input type="text" class="form-control" name="singleTitle" v-model="name">
                        </div>
                        <div class="form-group">
                            <label class="message_element">Имя</label>
                            <input type="text" class="form-control" name="singleTitle" v-model="surname">
                        </div>
                        <div class="form-group">
                            <label class="message_element">Отчество</label>
                            <input type="text" class="form-control" name="singleTitle" v-model="patronymic">
                        </div>
                        <div class="form-group">
                            <label > Предмет</label>
                            <select class="form-control" name="discipline" v-model="discipline">
                                <option value="">Выбрать предмет</option>
                                <option v-for="item in disciplines" :key="item['id_dis']" :value="item['id_dis']">{{item['title_discipline']}}</option>
                            </select>
                        </div>
                        <button type="button"  class="btn btn-outline-primary-send" @click="addNew">Добавить</button>
                        <router-link to="/mentor" class="message_element_active" @click="showModalAdd = false" style="float:right;  text-decoration: underline;"> Отмена</router-link>
                    </form>
                </div>
                <app-loader v-if="loading"></app-loader>
                <div class="content-wallpaper" v-else>
                    <div class="row">
                        <div class="col-4"> <h5 >Список</h5></div>
                        <div class="col-4"> <span>Общее количество: {{countNum}}</span></div>
                    </div>
                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col" style="width: 3%" >№</th>
                            <th scope="col" style="width: 15%">ФИО</th>
                            <th scope="col" style="width: 7%">Дисциплина</th>
                            <th scope="col" style="width: 5%">Изменить</th>
                            <th scope="col" style="width: 5%">Удалить</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in mentor" :key="item.id">
                                <th scope="row">{{index+1}}</th>
                                <td> {{item['name']}}  {{item['lastname']}} {{item['patronymic']}}</td>
                                <td>{{item['title_discipline']}}</td>
                                <td>
                                    <div style="text-align: center" @click="openItem(item['id'])">
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
    <transition  name="fade" appear>
        <div class="modal-overlay" v-if="showModal || showModalAdd" @click="clearFade">
        </div>
    </transition>
</template>

<script>

    import {ref, onMounted, computed, watch} from 'vue'
    import {useStore} from 'vuex'
    import {useRouter} from 'vue-router'
    import AppLoader from "../../../components/ui/AppLoader";
    import AdminProfileMenu from "../../../components/adminMenu/AdminProfileMenu"
    export default {
        setup() {
            const store = useStore()
            const router = useRouter()
            const showModal = ref(false)
            const showModalAdd = ref(false)
            const loading = ref(true)
            const mentor = ref()
            const singleId = ref()
            const id_dis = ref()
            const singleName = ref()
            const singleSurname = ref()
            const singlePatronymic = ref()
            const currentTime = ref()
            const countNum = ref(0)
            const singleTag = ref()
            const error = ref()
            const name = ref()
            const surname = ref()
            const patronymic = ref()
            const discipline = ref()
            const disciplines = ref()


            const deleteItem = async (id) => {
                await store.dispatch('admin/deleteMentor',{
                    id: id
                })
                await load()
            }

            const load = async() => {
                mentor.value = await store.dispatch('admin/getMentorData')
                countNum.value = mentor.value.length ? mentor.value.length : 0
                disciplines.value = await store.dispatch('discipline/getDisciplines')
            }

            const clearFade = () => {
                showModal.value = false
                showModalAdd.value = false
            }

            const editItem = async(singleId,singleSurname,singleName,singlePatronymic,id_dis) => {

                if(singleName && singleSurname && singleId && id_dis) {
                    await store.dispatch('admin/editMentorData',{
                        name:singleName,
                        lastname:singleSurname,
                        patronymic:singlePatronymic,
                        id:singleId,
                        id_dis:id_dis
                    })
                    await load()
                    showModal.value = false
                }
            }

            const addNew = async() => {
                if(name.value && surname.value && discipline.value ) {
                    await store.dispatch('admin/addMentor',{
                        name:name.value,
                        surname:surname.value,
                        patronymic:patronymic.value,
                        discipline:discipline.value
                    })
                    await load()
                    showModalAdd.value = false
                }
            }

            const openItem = async(id) => {
                showModal.value = true
                const info = await store.dispatch('admin/getMentorById',{id: id})
                singleName.value = info[0]['name']
                singleSurname.value = info[0]['lastname']
                singlePatronymic.value = info[0]['patronymic']
                singleId.value = info[0]['id']
                id_dis.value = info[0]['id_dis']
            }

            onMounted(async()=>{
                loading.value = true
                await load()
                loading.value = false
            })


            return {
                currentTime,
                singleTag,
                loading,
                deleteItem,
                countNum,
                disciplines,
                mentor,
                editItem,
                openItem,
                id_dis,
                showModal,
                name,
                surname,
                patronymic,
                error,
                discipline,
                singleId,
                singleName,
                singleSurname,
                singlePatronymic,
                showModalAdd,
                addNew,
                clearFade
            }
        },
        components: {AppLoader,AdminProfileMenu}
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
        width: 100%;
        max-width:550px;
        background-color: #fafbfc;
        padding: 1.5em 1.5em;
    }

    .btn-outline-primary {
        color: #4571a3;
        border-color: #4571a3;
    }

    .btn-outline-primary:hover {
        color: #fff;
        background-color: #4571a3;
        border-color: #4571a3;
    }

    .btn-outline-primary-send{
        color: #fff;
        background-color: #4571a3;
        border-color: #4571a3;
    }

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