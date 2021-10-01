<template>
    <div class="col-9 outside-block-indent">
        <div class="card page_info_wrap">
            <div class="card-body">
                <div class="row messenger">
                    <div class="col-4 messenger-aside">
                        <div class="dialogs">
                            <h3>Диалоги <button @click="this.isModal = true">Cont</button></h3>
                        <ul>
                            <li 
                                v-for="dialog in dialogs"
                                :key="dialog.id"
                                @click="openDialog(dialog.student_id)"
                            >
                                <div>
                                    <p v-if="dialogs.length && students.length">
                                        {{  students.find(student => student.user_id = dialog.student_id)['name'] }}
                                        {{  students.find(student => student.user_id = dialog.student_id)['surname']  }}
                                    </p>
                                </div>
                             
                                <div>
                                    <strong>{{new Date(dialog.updated_at).toLocaleTimeString().slice(0, -3)}}</strong>
                                </div>
                             </li>
                        </ul>
                        </div>
                    </div>

                    <div class="contacts" :class="isModal ? 'modal-opened' : 'modal-closed'">
                        <span class="close" @click="this.isModal = false">x</span>
                        <h3>Контакты</h3>
                        <ul class="contacts-list">
                            <li 
                                v-for="student in students"
                                :key="student.user_id"
                                @click="newDialogWindow(student)"
                            >   
                                {{student.name}} {{student.surname}} {{student.patronymic}}
                            </li>
                        </ul>
                    </div>
                            

                    <div class="col-8 chat">
                        <h3 v-if="student">{{student.name}} {{student.surname}} {{student.patronymic}}</h3>
                        <h3 v-else>Выберите диалог</h3>
                        <div class="chat-space" v-if="student">
                            <ul v-if="messages.length">
                                <li
                                    v-for="message in messages"
                                    :key="message.id"
                                    :class="message.from == 'tutor' ? 'from-me' : ''"
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

    import {ref, computed, onBeforeMount, onUpdated, onMounted} from 'vue';
    import {useStore} from 'vuex';
    import { v4 as uuidv4 } from 'uuid';

    export default {
        setup() {
            const isModal = ref(false);
            const store = useStore();
            const dialog = ref('');
            const student = ref('');

            const students = computed(() => store.getters['messenger/getContactsOfStudents']);
            const dialogs = computed(() => store.getters['messenger/getDialogs']);
            const messages = computed(() => (dialog.value 
                    ? store.getters['messenger/getMessagesByDialogId'](dialog.value.id)
                    : ref('')
                )
            );

            const message = ref('');
            const dialogId = ref('');


            function openDialog(student_id) {
                dialog.value = store.getters['messenger/getDialogByStudentId'](student_id);
                student.value = store.getters['messenger/getStudentById'](dialog.value.student_id);
            }

            function newDialogWindow(contact){
                dialog.value = dialogs.value.find(dialog => dialog.student_id == contact.user_id) ?? '';
                student.value = contact;
                isModal.value = false
            }

            function sentMessage() {
                if (!dialog.value) {
                    store.commit('messenger/createDialog', {
                        id: uuidv4(), 
                        student_id: student.value.user_id,
                        tutor_id: store.state['user'].userId,
                        created_at: new Date(),
                        updated_at: new Date()
                    });
                }

                store.commit('messenger/addMessage', {
                    dialog_id: dialog.value.id,
                    id: uuidv4(),
                    text: message.value,
                    created_at: new Date(),
                    from: 'tutor'
                })
                message.value = ''
            }
            onBeforeMount(() => {
                store.dispatch('messenger/setContactsOfStudents')
            })
            
            return {
                students,
                student,
                dialogs,
                dialog,
                messages,
                isModal,

                dialogId,
                message,

                openDialog,
                newDialogWindow,
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

    .chat-space li{
        margin-bottom: 13px;
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

    .chat h3{
        border-bottom: 2px solid #AAA;
    }

    .chat-space{
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        min-height: 90%;
        height: auto;
    }

    .messenger{
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

    .messenger-aside{
        border-right: 1px solid #CCC;
    }

    .messenger-aside h3, .chat h3{
        border-bottom: 2px solid #AAA;
    }

    .dialogs {
        max-height: 70vh;
    }

    .dialogs h3{
        display: flex;
        justify-content: space-between;
    }

    .dialogs h3 button {
        background: none;
        font-size: .9rem;
        width: 70px;
    }

    .dialogs li{
        cursor: pointer;
        margin-bottom: 1em;
    }

    .dialogs div:first-child{
        margin-bottom: .3em;
    }

    .contacts-list li{
        padding: 1em .3em;
        border-bottom: 1px solid #888;
        cursor: pointer;
    }

    .contacts{
        position: absolute;
        background: #FFF;
        padding: 1.5em 3em;
        border: 2px solid #999;
        box-shadow: 0 0 4px 0 #999;
        width: 500px;
        z-index: 1000;
        right: 0;
        left: 0;
        margin-left: auto;
        margin-right: auto;
    }

    .contacts.modal-opened{
        display: block;
    }

    .contacts.modal-closed{
        display: none;
    }

    .contacts ul{
        max-height: 70vh;
        overflow: scroll;
    }

    .contacts span.close{
        position: absolute;
        top: .9em;
        right: 1.5em;
        cursor: pointer;
    }
</style>