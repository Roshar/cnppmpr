<template>
    <div class="content-wallpaper">
        <div class="container bootstrap snippets bootdeys">

            <div class="panel" id="chat">
                <div class="panel-heading">
                    <h3 class="panel-title">
                        <i class="icon wb-chat-text" aria-hidden="true"></i> Личный чат
                    </h3>
                    <span>Если возникили вопросы по текущему заданию, напишите тьютору</span>
                </div>
                <hr>
<!--                <div class="panel-body">-->
<!--                    <div class="chats">-->
<!--                        <div class="chat">-->
<!--                            <div class="chat-body">-->
<!--                                <div class="chat-content">-->
<!--                                  <p></p>-->
<!--                                    <time class="chat-time" datetime="2015-07-01T11:37"></time>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div class="chat chat-left">-->
<!--                            <div class="chat-body">-->
<!--                                <div class="chat-content">-->
<!--                                    <p></p>-->
<!--                                    <time class="chat-time" datetime="2015-07-01T11:39"></time>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
                <div class="panel-footer">
                    <form>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Текст вопроса">
                            <span class="input-group-btn">
                             <button class="btn btn-outline-iom" type="button">Отправить</button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</template>



<style scoped>

    .container {
        min-height: 100vh;
    }
    .btn-outline-iom{
        color: #fff;
        background-color: #4571a3;
        border-color: #4571a3;
    }

    .chat-box {
        height: 100%;
        width: 100%;
        background-color: #fff;
        overflow: hidden
    }

    .chats {
        padding: 30px 15px
    }


    .chat-avatar {
        float: right
    }


    .chat-body {
        display: block;
        margin: 10px 30px 0 0;
        overflow: hidden
    }

    .chat-body:first-child {
        margin-top: 0
    }

    .chat-content {
        position: relative;
        display: block;
        float: right;
        padding: 8px 15px;
        margin: 0 20px 10px 0;
        clear: both;
        color: #fff;
        background-color: #62a8ea;
        border-radius: 4px;
        -webkit-box-shadow: 0 1px 4px 0 rgba(0,0,0,0.37);
        box-shadow: 0 1px 4px 0 rgba(0,0,0,0.37);
    }

    .chat-content:before {
        position: absolute;
        top: 10px;
        right: -10px;
        width: 0;
        height: 0;
        content: '';
        border: 5px solid transparent;
        border-left-color: #62a8ea
    }

    .chat-content>p:last-child {
        margin-bottom: 0
    }

    .chat-content+.chat-content:before {
        border-color: transparent
    }

    .chat-time {
        display: block;
        margin-top: 8px;
        color: rgba(255, 255, 255, .6)
    }

    .chat-left .chat-avatar {
        float: left
    }

    .chat-left .chat-body {
        margin-right: 0;
        margin-left: 30px
    }

    .chat-left .chat-content {
        float: left;
        margin: 0 0 10px 20px;
        color: #76838f;
        background-color: #dfe9ef
    }

    .chat-left .chat-content:before {
        right: auto;
        left: -10px;
        border-right-color: #dfe9ef;
        border-left-color: transparent
    }

    .chat-left .chat-content+.chat-content:before {
        border-color: transparent
    }

    .chat-left .chat-time {
        color: #a3afb7
    }

    .panel-footer {
        padding: 0 30px 15px;
        background-color: transparent;
        border-top: 1px solid transparent;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    .avatar img {
        width: 100%;
        max-width: 100%;
        height: auto;
        border: 0 none;
        border-radius: 1000px;
    }
    .chat-avatar .avatar {
        width: 30px;
    }
    .avatar {
        position: relative;
        display: inline-block;
        width: 40px;
        white-space: nowrap;
        border-radius: 1000px;
        vertical-align: bottom;
    }
</style>