<template>
    <div class="modal-form" v-if="showModalLib">
        <div class="filter">
            <h5>Поисковик</h5><button type="button"  class="btn btn-info" @click="$emit('closeLib')">Отменить</button>
            <div class="form-control">
                <label> Найти задание по названию</label>
                <input type="text" placeholder="Начните вводить название" v-model="title">
            </div>
            <div class="form-control">
                <label> Найти по категории</label>
                <select v-model="tag">
                    <option value=""> Все</option>
                    <option  v-for="item in tagsData" :value="item['id_tag']">{{item['title_tag']}}</option>
                </select>
            </div>

        </div>
        <div class="col-12" v-else>
            <h5 >Список из библиотеки</h5>
            <table class="table table-sm">
                <thead>
                <tr>
                    <th scope="col">№</th>
                    <th scope="col">Наименование</th>
                    <th scope="col">Описание</th>
                    <th scope="col">Категория</th>
                    <th scope="col">Действие</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in execLib" :key="item.id" >
                        <th scope="row">{{index +1}}</th>
                        <td>{{item['title']}}</td>
                        <td> {{shortContent(item['description'])}}</td>
                        <td>{{item['title_tag']}}</td>
                        <td><button class="btn btn-success" @click="addTaskFromLib(item.id)">Добавить</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import {ref,watch} from 'vue'
    import {useStore} from 'vuex'
    import {shortContent} from "../../utils/shortContent";
    import {useRoute} from 'vue-router'
    import {useRouter} from 'vue-router'
    export default {
        emits: ['update:modelValue','closeLib'],
        props: ['modelValue','tagsData','showModalLib','execLib'],
        setup(_,{emit}) {
            const title = ref()
            const tag = ref()
            const term = ref()
            const store = useStore()
            const route = useRoute()
            const router = useRouter()
            watch([title,tag], values => {
                emit('update:modelValue', {
                    title: values[0],
                    tag: values [1]
                })
            })
            const addTaskFromLib = async (id) => {
                const values = {
                    id: id,
                    iomId: route.params.id
                }
                await store.dispatch('iom/addExerciseFromLib',{token:localStorage.getItem('jwt-token'),values})
                await store.dispatch('iom/getExercisesByIomId',route.params)
                emit('closeLib')
                await router.push(`/iom/${route.params.id}/exercise`)
            }
            return{
                title,
                tag,
                addTaskFromLib,
                shortContent,
                term,
            }
        }
    }
</script>

<style scoped>

</style>