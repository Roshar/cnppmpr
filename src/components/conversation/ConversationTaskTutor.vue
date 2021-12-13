<template>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
    <section class="content-item" id="comments">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <form>
                        <h3 class="pull-left">Обсуждение вопросов по заданию</h3>
                        <button type="button"  @click="sendComment" :disabled="disabled"  class="btn btn-normal  btn-outline-secondary pull-right">Оставить комментарий</button>
                        <fieldset>
                            <div class="row">
                                <div class="form-group col-12">
                                    <textarea class="form-control" v-model="commentChatBody" id="message" placeholder="Чат поддержки" required=""></textarea>
                                </div>
                            </div>
                        </fieldset>
                    </form>

                    <h3 v-if="chat">Всего комментариев: {{chat.length}}</h3>

                    <!-- COMMENT  - START -->
                    <div v-for="item in chat">
                        <div class="media">
                            <a class="pull-left" href="#"><img class="media-object" :src="generationUrl(item.avatar)" alt=""></a>
                            <div class="media-body">
                                <h4 class="media-heading" v-if="item['sender_id'] === tutorId">Вы</h4>
                                <h4 class="media-heading" v-if="item['sender_id'] !== tutorId"> {{item.surname}} {{item.name}} </h4>
                                <p>{{item.message}}</p>
                                <ul class="list-unstyled list-inline media-detail pull-left">
                                    <li><i class="fa fa-calendar"></i>{{item['created_date']}}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- COMMENT  - END -->

                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import {ref,onMounted, watch} from 'vue'
    import {useStore} from "vuex";
    import {useRouter, useRoute} from 'vue-router'
    export default {
        emits:['open','sendMessage'],
        props: ['chat','studentId','tutorId'],

        setup(_,{emit}) {

            const baseUrl = ref(process.env.VUE_APP_URL)
            const router = useRouter()
            const route = useRoute()
            const store = useStore()
            const commentChatBody = ref()
            const commentChatBodyError = ref()
            const disabled = ref(true)

            const generationUrl = (val) => {
                return (val) ? baseUrl.value + '/' + val : ''
            }

            watch([commentChatBody], ()=> {
                if(commentChatBody.value && commentChatBody.value.length >=2 ) {
                    disabled.value = false
                }else {
                    disabled.value = true
                }
            })

            const sendComment = async() => {

                if(commentChatBody.value && commentChatBody.value.length >=2 ) {

                    await store.dispatch('tutor/sendCommentsForTaskTutor', {
                        iomId: route.params.iom,
                        exId: route.params.exId,
                        student: route.params.studentId,
                        content: commentChatBody.value,
                        token: localStorage.getItem('jwt-token')
                    })
                    commentChatBody.value = ''
                    emit('sendMessage')
                    await router.push(`/show_exercises_accepted/${route.params.iom}/${route.params.exId}/${route.params.studentId}`)
                }

            }
            return {
                baseUrl,
                generationUrl,
                commentChatBody,
                commentChatBodyError,
                disabled,
                sendComment
            }
        }
    }
</script>





<style scoped>

    .btn-own {
        padding: 0;
    }

    .content-wallpaper {
        padding:15px 0px
    }

    .social_actions button{
        font-size: .9em;
        color: #5d5d5d;
    }

    .container {
        min-height: 100vh;
    }
    .content-item {
        padding:30px 0;
        background-color:#FFFFFF;
    }

    .content-item.grey {
        background-color:#F0F0F0;
        padding:50px 0;
        height:100%;
    }

    .content-item h2 {
        font-weight:700;
        font-size:35px;
        line-height:45px;
        text-transform:uppercase;
        margin:20px 0;
    }

    .content-item h3 {
        font-weight:400;
        font-size:20px;
        color:#555555;
        margin:10px 0 15px;
        padding:0;
    }

    .content-headline {
        height:1px;
        text-align:center;
        margin:20px 0 70px;
    }

    .content-headline h2 {
        background-color:#FFFFFF;
        display:inline-block;
        margin:-20px auto 0;
        padding:0 20px;
    }

    .grey .content-headline h2 {
        background-color:#F0F0F0;
    }

    .content-headline h3 {
        font-size:14px;
        color:#AAAAAA;
        display:block;
    }


    #comments {
        box-shadow: 0 -1px 6px 1px rgba(0,0,0,0.1);
        background-color:#FFFFFF;
    }

    #comments form {
        margin-bottom:30px;
    }

    #comments .btn {
        margin-top:7px;
    }

    #comments form fieldset {
        clear:both;
    }

    #comments form textarea {
        height:100px;
    }

    #comments .media {
        border-top:1px dashed #DDDDDD;
        padding:20px 15px 20px 5px;
        margin:0;
        background-color: #f4faff;
        /*background-color: tomato;*/
    }

    #comments .media > .pull-left {
        margin-right:20px;
    }

    #comments .media img {
        max-width:100px;
    }

    #comments .media h4 {
        margin:0 0 10px;
    }

    #comments .media h4 span {
        font-size:14px;
        float:right;
        color:#999999;
    }

    #comments .media p {
        margin-bottom:15px;
        text-align:justify;
    }

    #comments .media-detail {
        margin:0;
    }

    #comments .media-detail li {
        color:#AAAAAA;
        font-size:12px;
        padding-right: 10px;
        font-weight:600;
    }

    #comments .media-detail a:hover {
        text-decoration:underline;
    }

    #comments .media-detail li:last-child {
        padding-right:0;
    }

    #comments .media-detail li i {
        color:#666666;
        font-size:15px;
        margin-right:10px;
    }
</style>