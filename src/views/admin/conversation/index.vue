<template>
    <div class="col-3">
        <AdminStudentMenu></AdminStudentMenu>
    </div>
    <div class="col-9">
        <div class="modal-form" v-if="showModal" >
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
                <div class="content-wallpaper">
                <div class="form-group" >
                    <select class="form-control" name="role" v-model="role">
                        <option value=""> Выберите категорию пользователей:</option>
                        <option value="students">Студенты</option>
                        <option value="tutors">Тьюторы</option>
                        <option value="admins">Админы</option>
                    </select>
                    <div v-if="role !== '' " style="margin: 15px 0px">
                        <input type="text"  class="form-control" v-model="searchContact" placeholder="Введите имя или фамилию">
                    </div>
                </div>
                    <div class="contacts">
                        <button  type="button" v-if="searchContactData" v-for="item in searchContactData" :key="item.id" class="list-group-item list-group-item-action border-0"
                                 @click="createConversation(item.user_id )">
                            <div class="d-flex align-items-start">
                                <img :src="baseUrl+'/'+item.avatar" class="rounded-circle mr-1"  width="40" height="40">
                                <div class="flex-grow-1 ml-3">
                                    {{item.name}} {{item.surname}} {{checkOnlineContact(item['auth_update'], 5)}}
                                    <div class="small"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" :class="onlineClass" fill="currentColor"  viewBox="0 0 16 16">
                                        <circle cx="8" cy="8" r="8"/>
                                    </svg> {{onlineStatus}}</div>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <app-loader v-if="loading"></app-loader>
        <div class="content-wallpaper">
            <conversation-list :s_companions="s_companions"
                               :t_companions="t_companions"
                               :a_companions="a_companions"
                               @open="showModal=true" > </conversation-list>
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
    import {useRouter, useRoute} from 'vue-router'
    import AppLoader from "../../../components/ui/AppLoader";
    import AdminStudentMenu from "../../../components/adminMenu/AdminStudentMenu";
    import ConversationList from "../../../components/conversation/admin/ConversationList";
    export default {
        setup() {
            const store = useStore()
            const router = useRouter()
            const route = useRoute()
            const baseUrl = ref(process.env.VUE_APP_URL)
            const loading = ref(true)
            const showModal = ref(false)
            const role = ref('')
            const searchContact = ref()
            const searchContactData = ref()
            const companions = ref()
            const s_companions = ref()
            const t_companions = ref()
            const a_companions = ref()
            const onlineClass = ref()
            const onlineStatus = ref()
            const chatParams = ref()

            const checkOnline = (val,limit) => {
                let currentDate = new Date();
                let currentTIme = new Date(currentDate.getTime());
                let fromSqlTime = new Date(val);
                let compare = Math.floor((currentTIme - fromSqlTime.getTime()) / 1000 / 60)

                if(compare > limit){
                    onlineClass.value = 'bi bi-circle-fill environment-out'
                    onlineStatus.value = 'не в сети'
                }else {
                    onlineClass.value = 'bi bi-circle-fill environment-in'
                    onlineStatus.value = 'в сети'
                }
            }

            const checkOnlineContact = (val,limit) => {
                let currentDate = new Date();
                let currentTIme = new Date(currentDate.getTime());
                let fromSqlTime = new Date(val);
                let compare = Math.floor((currentTIme - fromSqlTime.getTime()) / 1000 / 60)

                if(compare > limit){
                    onlineClass.value = 'bi bi-circle-fill environment-out'
                    onlineStatus.value = 'не в сети'
                }else {
                    onlineClass.value = 'bi bi-circle-fill environment-in'
                    onlineStatus.value = 'в сети'
                }
            }

            watch([searchContact,role],async (values) => {
                if(values[0] && role.value !== ''){
                    searchContactData.value = await store.dispatch('conversation/searchUser',{
                        tbl: values[1],
                        searchValue: values[0]
                    })
                }else {
                    searchContactData.value = []
                }
            })

            onMounted(async()=>{
                loading.value = true
                companions.value =  await store.dispatch('conversation/getCompanions')
                s_companions.value = store.getters['conversation/getCompanionsStudent']
                t_companions.value = store.getters['conversation/getCompanionsTutor']
                a_companions.value = store.getters['conversation/getCompanionsAdmin']
                loading.value = false
            })

            const createConversation = async (user) => {
                chatParams.value = await store.dispatch('conversation/createConversationWithoutInsert',{
                    targetUserId: user
                })
                companions.value =  await store.dispatch('conversation/getCompanions')
                s_companions.value = store.getters['conversation/getCompanionsStudent']
                t_companions.value = store.getters['conversation/getCompanionsTutor']
                a_companions.value = store.getters['conversation/getCompanionsAdmin']
                showModal.value = false
                await router.push(`/admin_conversations/${chatParams.value.conId}/${chatParams.value.targetUserId}`)
            }
            return {
                showModal,
                checkOnline,
                loading,
                baseUrl,
                ConversationList,
                s_companions,
                t_companions,
                a_companions,
                role,
                searchContact,
                searchContactData,
                checkOnlineContact,
                onlineClass,
                onlineStatus,
                createConversation,
            }
        },
        components: {ConversationList, AppLoader, AdminStudentMenu}
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

    .environment-out {
        color: tomato !important;
    }
    .environment-in {
        color: #528c83 !important;
    }















</style>