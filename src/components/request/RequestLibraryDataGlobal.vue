<template>
    <div class="modal-form" v-if="showModalLibGlobal">
        <div class="content-wallpaper">
            <div class="row">
                <div class="col-12">
                <span style="float:right" @click="$emit('closeLib')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                      <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                    </svg>
                </span>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <label> Найти по категории</label>
                    <select class="form-control" v-model="tag">
                        <option value=""> Все</option>
                        <option  v-for="item in tagsData" :value="item['id_tag']">{{item['title_tag']}}</option>
                    </select>
                </div>
            </div>
            <hr>

            <div class="row">
                <div class="col-12" >
                    <h5 >Список из глобальной библиотеки</h5>
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
                        <tr v-for="(item, index) in execLibGlobal" :key="item.id" >
                            <th scope="row">{{index +1}}</th>
                            <td>{{item['title']}}</td>
                            <td> {{shortContent(clearHTML(item['description']),50)}}</td>
                            <td>{{item['title_tag']}}</td>
                            <td><button class="btn  btn-block btn-outline-primary-send" @click="addTaskFromLib(item.id)">Добавить</button></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {ref,watch} from 'vue'
    import {useStore} from 'vuex'
    import {shortContent} from "../../utils/shortContent";
    import {useRoute} from 'vue-router'
    import {useRouter} from 'vue-router'
    import {clearHTML} from "../../utils/clearHTML";
    export default {
        emits: ['update:modelValue','closeLibGlobal'],
        props: ['modelValue','tagsData','showModalLibGlobal','execLibGlobal'],
        setup(_,{emit}) {
            const tag = ref()
            const term = ref()
            const store = useStore()
            const route = useRoute()
            const router = useRouter()
            watch([tag], values => {
                emit('update:modelValue', {
                    tag: values [0]
                })
            })
            const addTaskFromLib = async (id) => {
                const values = {
                    id: id,
                    iomId: route.params.id
                }
                await store.dispatch('iom/addExerciseFromLibGlobal',{token:localStorage.getItem('jwt-token'),values})
                await store.dispatch('iom/getExercisesByIomId',route.params)
                emit('closeLib')
                await router.push(`/my_iom/${route.params.id}/exercise`)
            }
            return{
                tag,
                addTaskFromLib,
                shortContent,
                term,
                clearHTML
            }
        }
    }
</script>

<style scoped>
    .content-wallpaper {
        padding: 70px 40px;
        background-color: white;
        color: #5d5d5d;
    }

    .btn-outline-primary-send{
        color: #fff;
        background-color: #4571a3;
        border-color: #4571a3;
    }
</style>