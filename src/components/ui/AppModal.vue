<template>

        <div class="modal-body">
            <h4 v-if="title"> {{title}}</h4>
            <slot />
        </div>
        <div class="modal-backdrop" @click="$emit('close')"> </div>
</template>

<script>
    export default {
        emits:['close'],
        props: {
            title: {
                type: String
            }
        }
    }
</script>

<style scoped>


</style>