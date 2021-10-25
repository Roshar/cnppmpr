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
                <div v-if="s_companions">
                    <router-link  v-for="(item,index) in s_companions" :key="item.id" :to="{path:`/conversations/${item.id}/${item.target_user_id}`}" class="list-group-item list-group-item-action border-0">
                        <div class="badge bg-success float-right">5</div>
                        <div class="d-flex align-items-start">
                            <img :src="item.avatar" class="rounded-circle mr-1"  width="40" height="40">
                            <div class="flex-grow-1 ml-3">
                                {{item.name}} {{item.surname}} {{checkOnline(item['auth_update'],5)}}
                                <div class="small"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" :class="onlineClass" viewBox="0 0 16 16">
                                    <circle cx="8" cy="8" r="8"/>
                                </svg> {{onlineStatus}}</div>
                            </div>
                        </div>
                    </router-link>
                </div>
                <hr class="d-block d-lg-none mt-1 mb-0">
            </div>
        </div>
    </div>
</template>

<script>

    import {ref, watch} from "vue";
    import {useStore} from 'vuex'

    export default {
        emits:['open'],
        props: ['s_companions'],
        setup() {
            const store = useStore()
            const onlineClass = ref()
            const onlineStatus = ref()
            const name_a = ref()
            const surname_a = ref()
            const avatar_a = ref()
            const user_a = ref()
            const myAvatar = ref()
            const contacts = ref()
            const chat = ref()



            watch([contacts],async(values)=> {
                console.log(values)

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


            const setChat = async(conId,user,name,surname,avatar) => {
                // const data =  await store.dispatch('conversation/getChat',{
                //         token:localStorage.getItem('jwt-token'),
                //         conId,
                //         user,
                //         name,
                //         surname,
                //         avatar
                //     })
                // chat.value = data.chatData
                // console.log(chat.value)
                // user_a.value = data['addressee_id']
                // surname_a.value = data['addressee_surname']
                // avatar_a.value = data['addressee_avatar']
                // name_a.value = data['addressee_name']
                // myAvatar.value = data.senderData[0].avatar

                // console.log(activeChat1.value)
            }


            return { checkOnline,onlineClass, onlineStatus, setChat,
                    avatar_a,name_a,surname_a,user_a,chat, myAvatar,contacts}
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