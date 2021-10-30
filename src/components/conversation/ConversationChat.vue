<template>
    <div class="card" >
        <div class="row g-0">
            <div class="col-12 col-lg-5 col-xl-3 border-right">
                <div class="px-4 d-none d-md-block">
                    <div class="d-flex align-items-center">
                        <div class="flex-grow-1">
                            <input type="text" class="form-control my-3" v-model="contacts" placeholder="Поиск...">
                        </div>
                        <svg @click="$emit('open')" xmlns="http://www.w3.org/2000/svg" width="36" height="36"
                             fill="currentColor"  class="bi bi-pencil-square" viewBox="0 0 16 16" style="margin-left: .5em">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                    </div>
                </div>
                <div v-if="a_companions">
                    <button v-for="(item,index) in s_companions" :key="item.id"  @click="getRoom(item.id, item.target_user_id)"   class="list-group-item list-group-item-action border-0">
                        <div class="d-flex align-items-start">
                            <img :src="item.avatar" class="rounded-circle mr-1"  width="40" height="40">
                            <div class="flex-grow-1 ml-3">
                                {{item.name}} {{item.surname}} {{checkOnline(item['auth_update'],5)}}
                                <div class="small"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" :class="onlineClass" viewBox="0 0 16 16">
                                    <circle cx="8" cy="8" r="8"/>
                                </svg> {{onlineStatus}}</div>
                            </div>
                        </div>
                    </button>
                </div>
                <div v-if="t_companions">
                    <button v-for="(item,index) in t_companions" :key="item.id"  @click="getRoom(item.id, item.target_user_id)"   class="list-group-item list-group-item-action border-0">
                        <div class="d-flex align-items-start">
                            <img :src="item.avatar" class="rounded-circle mr-1"  width="40" height="40">
                            <div class="flex-grow-1 ml-3">
                                {{item.name}} {{item.surname}} {{checkOnline(item['auth_update'],5)}}
                                <div class="small"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" :class="onlineClass" viewBox="0 0 16 16">
                                    <circle cx="8" cy="8" r="8"/>
                                </svg> {{onlineStatus}}</div>
                            </div>
                        </div>
                    </button>
                </div>
                <div v-if="s_companions">
                    <button type="button" v-for="(item,index) in a_companions" :key="item.id"  @click="getRoom(item.id, item.target_user_id)"   class="list-group-item list-group-item-action border-0">
                        <div class="d-flex align-items-start">
                            <img :src="item.avatar" class="rounded-circle mr-1"  width="40" height="40">
                            <div class="flex-grow-1 ml-3">
                                {{item.name}} {{item.surname}} {{checkOnline(item['auth_update'],5)}}
                                <div class="small"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" :class="onlineClass" viewBox="0 0 16 16">
                                    <circle cx="8" cy="8" r="8"/>
                                </svg> {{onlineStatus}}</div>
                            </div>
                        </div>
                    </button>
                </div>
                <hr class="d-block d-lg-none mt-1 mb-0">
            </div>

            <div class="col-12 col-lg-7 col-xl-9"  >

                <div class="py-2 px-4 border-bottom d-none d-lg-block">
                    <div class="d-flex align-items-center py-1" v-if="addresseeData">
                        <div class="position-relative" >
                            <img  :src="addresseeData[0]['avatar']" class="rounded-circle mr-1" alt="Иван" width="40" height="40">
                        </div>
                        <div class="flex-grow-1 pl-3">
                            <strong>{{addresseeData[0].name}} {{addresseeData[0].surname}}</strong>
                            <div class="text-muted small">был: <em>{{addresseeData[0]['auth_update']}}</em></div>
                        </div>
                        <div>
                            <button class="btn btn-primary btn-lg mr-1 px-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-phone feather-lg"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></button>
                            <button class="btn btn-info btn-lg mr-1 px-3 d-none d-md-inline-block"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-video feather-lg"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg></button>
                            <button class="btn btn-light border btn-lg px-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal feather-lg"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></button>
                        </div>
                    </div>
                </div>

                <div class="position-relative">
                    <div class="chat-messages p-4" v-for="item in chatData" :key="item.id">

                        <div v-if="item.source_user == senderData[0]['user_id']" class="chat-message-right  pb-4">
                            <div>
                                <div class="text-muted small text-nowrap mt-2">{{item.created_date}}</div>
                            </div>
                            <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                                <div class="font-weight-bold mb-1">Вы</div>
                                {{item['body']}}
                            </div>
                        </div>
                        <div class="chat-message-left pb-4" v-if="item.source_user == addresseeData[0]['user_id']">
                            <div>
                                <div class="text-muted small text-nowrap mt-2">{{item.created_date}}</div>
                            </div>
                            <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                                <div class="font-weight-bold mb-1">{{addresseeData[0].name}} {{addresseeData[0].surname}}</div>
                                {{item['body']}}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex-grow-0 py-3 px-4 border-top">
                    <div class="input-group">
                        <input type="text" class="form-control" @keydown.enter="sendMsg" v-model="message" placeholder="Сообщение">
                        <button class="btn btn-primary"  @click="sendMsg">Отправить</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>

    import {ref, watch} from "vue";
    import {useStore} from 'vuex'
    import {useRoute, useRouter} from 'vue-router'

    export default {
        emits:['open','sendMessage'],
        props: ['s_companions','t_companions','a_companions','senderData','addresseeData','chatData'],
        setup(_,{emit}) {
            const router = useRouter()
            const route = useRoute()
            const store = useStore()
            const targetUserId = ref(route.params.user)
            const onlineClass = ref()
            const onlineStatus = ref()
            const name_a = ref()
            const surname_a = ref()
            const avatar_a = ref()
            const user_a = ref()
            const myAvatar = ref()
            const contacts = ref()
            const chat = ref()
            const message = ref()

            watch(()=>route.params, (val)=>{
                targetUserId.value = val.user
            })


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

            const getRoom = (rootId, targetUser) => {
                // //TODO use vue for get chat without redirect
                //
                window.location.href = `/conversations/${rootId}/${targetUser}`;
            }


            const sendMsg = async() => {
                if(message.value.trim().length > 0) {
                    emit('sendMessage', {
                        message: message.value,
                        targetUserId: targetUserId.value
                    })
                    message.value = ''
                }
            }

            return { checkOnline,onlineClass, onlineStatus,
                avatar_a,name_a,surname_a,user_a,chat, myAvatar,contacts,getRoom, sendMsg,message}
        }
    }
</script>

<style scoped>

    .chat-online {
        color: #34ce57
    }

    .chat-offline {
        color: #e4606d
    }

    .chat-messages {
        display: flex;
        flex-direction: column;
        max-height: 800px;
        overflow-y: scroll
    }

    .chat-message-left,
    .chat-message-right {
        display: flex;
        flex-shrink: 0
    }

    .chat-message-left {
        margin-right: auto
    }

    .chat-message-right {
        flex-direction: row-reverse;
        margin-left: auto
    }
    .py-3 {
        padding-top: 1rem!important;
        padding-bottom: 1rem!important;
    }
    .px-4 {
        padding-right: 1.5rem!important;
        padding-left: 1.5rem!important;
    }
    .flex-grow-0 {
        flex-grow: 0!important;
    }
    .border-top {
        border-top: 1px solid #dee2e6!important;
    }

    .environment-out {
        color: tomato !important;
    }
    .environment-in {
        color: #528c83 !important;
    }
</style>