<template>
    <div class="col-9 outside-block-indent">
        <div class="card page_info_wrap">
            <div class="card-body">
                <div class="row messenger">
                    <h3 v-if="!tutor.length">Вам еще не назначен тьютор</h3>
                    <div v-else class="col-12 chat">
                        <h3>Тьютор: {{tutor}}</h3>
                        <div class="chat-space">
                            <ul v-if="messages.length">
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
                                <button @click="sentMessage">Отправить</button>
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

            const message = ref('');
            const dialog = computed(() => store.getters['messenger/getDialogByTutorId'](store.state['user'].userLink['user_id']));

            const messages = computed(() => (dialog.value 
                    ? store.getters['messenger/getMessagesByDialogId'](dialog.value.id)
                    : ref('')
                )
            );

            
            const tutor = computed(() => (store.state['user'].userLink 
                    ? `${store.state['user'].userLink['surname']} ${store.state['user'].userLink['name']} ${store.state['user'].userLink['patronymic']}`
                    : ref('') 
                )
            );

            function sentMessage() {
                console.log(dialog)
                if (!dialog.value) {
                    store.commit('messenger/createDialog', {
                        id: uuidv4(), 
                        student_id: store.state['user'].userId,
                        tutor_id: store.state['user'].userLink['user_id'],
                        created_at: new Date(),
                        updated_at: new Date()
                    });
                }
                console.log(dialog)

                store.commit('messenger/addMessage', {
                    dialog_id: dialog.value.id,
                    id: uuidv4(),
                    text: message.value,
                    created_at: new Date(),
                    from: 'student'
                })
                message.value = ''
            }

            /* onUpdated(() => {
                console.log(messages.value)
            }) */

            return {
                dialog,
                messages,
                message,
                tutor,
                
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
    }

    li{
        margin-bottom: 13px;
        /* display: flex;
        justify-content: space-between; */
        width: 300px;
        margin-right: auto;
        padding: .7em 1em;
        border-radius: 15px;
        box-shadow: 3px 3px 3px 0px #373c595c;
        background-color: rgb(34 57 195 / 11%);
    }

    li:last-child{
        margin-bottom: 0;
    }

    li.from-me{
        margin-right: 0;
        margin-left: auto;
        box-shadow: -3px 3px 3px 0px #373c595c;
        background-color: rgb(34 57 195 / 26%);
    }

   /*  .chat{
    } */
    
    .chat h3{
        border-bottom: 2px solid #AAA;
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