<template>
    <div>
        <h1>TEST</h1>
        {{data}}
    </div>
</template>

<script>
    import {useStore} from 'vuex'
    import {onMounted, ref} from 'vue'
    export default {
        setup() {
            const store = useStore()

            const data = ref()

            onMounted(async() => {
                data.value = await  store.dispatch('area/test')
            })


            return {
                data
            }
        }
    }
</script>

<style scoped>

</style>