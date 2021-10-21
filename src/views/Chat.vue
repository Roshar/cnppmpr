<template>
    <div class="col-9 outside-block-indent">
        <div class="card page_info_wrap">
            <div class="card-body">
                <div class="row messenger">
                    <h3 v-if="!tutor">Вам еще не назначен тьютор</h3>
                    <div v-else class="col-12 chat">
                        <h3>Тьютор: {{tutorFullName}}</h3>
                        <div class="chat-space">
                            <ul v-if="messages.length" ref="messagesUl">
                                <li
                                    v-for="message in messages"
                                    :key="message.id"
                                    :class="message.from == 'student' ? 'from-me' : ''"
                                >
                                    <p>{{message.text}}</p>
                                    <strong>{{new Date(message.created_at).toLocaleTimeString().slice(0, -3)}}</strong>
                                </li>
                            </ul>
                            <div v-else>Отправьте первое сообщение чтобы начать диалог</div>

                            <div class="input-form">
                                <textarea v-model="message" class="messenger-input" placeholder="Введите сообщение"></textarea>
                                <button @click="sentMessage" :disabled="!message.length">Отправить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </div>          
</template>

<script>

    import {ref, computed, onMounted, onUpdated} from 'vue';
    import {useStore} from 'vuex';
    import { v4 as uuidv4 } from 'uuid';

    export default {
        setup() {
            const store = useStore();

            const messagesUl = ref('');
            const message = ref('');

            const tutor = computed(() => store.state['user'].userLink ?? ref('') 
            );
            const tutorFullName = computed(() => tutor.value
                ? `${store.state['user'].userLink['surname']} ${store.state['user'].userLink['name']} ${store.state['user'].userLink['patronymic']}`
                : ref('')
            );

            const dialog = computed(() => store.getters['messenger/getDialogByTutorId'](tutor.value['user_id'])
                    ?  store.getters['messenger/getDialogByTutorId'](tutor.value['user_id'])
                    : ref('')
            );

            const messages = computed(() => dialog.value 
                    ? store.getters['messenger/getMessagesByDialogId'](dialog.value.id)
                    : ref('')
            );

            function sentMessage() {
                if (!dialog.value) {
                    store.commit('messenger/createDialog', {
                        id: uuidv4(), 
                        student_id: store.state['user'].userId,
                        tutor_id: tutor['user_id'],
                        created_at: new Date(),
                        updated_at: new Date()
                    });
                }

                store.commit('messenger/sentMessage', {
                    dialog_id: dialog.value.id,
                    id: uuidv4(),
                    text: message.value,
                    created_at: new Date(),
                    from: 'student'
                })
                message.value = ''
            }

            onUpdated(() => {
                if(messagesUl.value){
                    messagesUl.value.scrollTo({
                        top: messagesUl.value.scrollHeight,
                        behavior: "smooth"
                    })
                }
            })

            return {
                messagesUl,
                dialog,
                messages,
                message,
                tutor,
                tutorFullName,
                
                sentMessage
            }
        }
    }
</script>

<style scoped>
    p, ul{
        margin: 0;
        padding: 0;
    }

    ul{
        list-style: none;
        padding: 1em 1em .5em;
        overflow: scroll;
        height: 400px;
    }

    li{
        margin-bottom: 13px;
        width: 300px;
        margin-right: auto;
        padding: .7em 1em;
        border-radius: 15px;
        box-shadow: 3px 3px 3px 0px #373c595c;
        background-color: rgb(34 57 195 / 26%);
    }

    li:first-child{
        margin-top: auto;
    }

    li:last-child{
        margin-bottom: 0;
    }

    li.from-me{
        margin-right: 0;
        margin-left: auto;
        box-shadow: -3px 3px 3px 0px #373c595c;
        background-color: rgb(34 57 195 / 11%);
    }

    .chat h3{
        border-bottom: 2px solid #AAA;
    }

    .chat ul {
        display: flex;
        flex-direction: column;
    }

    .chat-space{
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        min-height: 50vh;
        max-height: 70vh;
        height: auto;
    }

    .input-form{
        display: flex;
        width: 100%;
        margin-top: 1em;
        align-items: flex-end;
    }

    .messenger-input{
        width: 100%;
        padding: .5em .7em;
        border: 1px solid #bbb;
        box-shadow: 1px 1px 2px 0px #bbbbbb;
    }

    .input-form button{
        margin-left: 1em;
        border: 1px solid #bbb;
        padding: .7em 1em;
        background: none;
        box-shadow: 1px 1px 2px 0px #bbbbbb;
    }
</style>