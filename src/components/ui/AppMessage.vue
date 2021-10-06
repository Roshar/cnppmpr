<template>
    <div  class="container">
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
                <div class="notification-app" v-if="message">
                    <div  :class="['alert alert-warning alert-dismissible fade show']" role="alert">
                        {{title}} {{message.value}}
                        <button type="button"  @click.prevent="close" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

            </div>
            <div class="col-3"></div>
        </div>
    </div>
</template>

<script>
    import {computed} from 'vue'
    import {useStore} from 'vuex'
    export default {
        setup() {
            const TITLE_MAP = {
                primary: 'Успешно!',
                danger: 'Ошибка!',
                warning: 'Внимание!'
            }
            const store = useStore()

            const message = computed(() => store.state.systemMessage)

            const title = computed(() => message.value ? TITLE_MAP[message.value.type] : null)

            return {
                message,
                title,
                close: () => {
                    store.commit('clearSystemMessage')
                }
            }
        }
    }
</script>

<style scoped>
.notification-app {
    position: absolute;
    top:0;
    z-index: 999;
}
</style>