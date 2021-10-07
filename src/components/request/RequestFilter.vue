<template>
    <div class="filter">
        <div class="form-control">
            <input type="text" placeholder="Фильтрация по имени" v-model="title">
        </div>
        <div class="form-control">
            <select v-model="tag">
                <option value="1">Первый</option>
                <option value="2">Второй</option>
            </select>
        </div>
    </div>
</template>

<script>
    import {ref,watch} from 'vue'
    export default {
        emits: ['update:modelValue'],
        props: ['modelValue'],
        setup(_,{emit}) {
            const title = ref()
            const tag = ref()
            watch([title,tag], values => {
                emit('update:modelValue', {
                    title: values[0],
                    tag: values [1]
                })
            })
            return{
                title,
                tag
            }
        }

    }
</script>

<style scoped>

</style>