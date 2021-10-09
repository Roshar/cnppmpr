<template>
        <div class="col-9">
            <h4>Карта индивидуального образовательного маршрута </h4>
            <button type="button" class="btn btn-info" @click="showModal = true">Создать задание</button>
            <button type="button" class="btn btn-success" @click="showModal = true">Добавить задание из библиотеки</button>
            <button type="button" class="btn btn-danger" @click="showModal = true">Удалить ИОМ!</button>
            <div class="modal-form" v-if="showModal">
                <form @submit.prevent="onSubmit" id="form">
                    <div class="form-group">
                        <label for="title">Название задания</label>
                        <input type="text" :class="['form-control',{invalid:titleError}]" v-model="title"  id="title"  placeholder="Введите название задания">
                        <small v-if="titleError">{{titleError}}</small>
                    </div>
                    <div class="form-group">
                        <label for="description">Краткое описание:</label>
                        <textarea :class="['form-control',{invalid:descriptionError}]" id="description" v-model="description"  name="description" placeholder="Здесь вы можете добавить краткое описание"></textarea>
                        <small v-if="descriptionError">{{descriptionError}}</small>
                    </div>
                    <div class="form-group">
                        <label for="link">Ссылка на задание</label>
                        <input type="text" :class="['form-control',{invalid:linkError}]" v-model="link" id="link" name="link" placeholder="Введите название задания">
                        <small v-if="linkError">{{linkError}}</small>
                    </div>
                    <div class="form-group">
                        <select :class="['form-control',{invalid:mentorError}]" name="author" v-model="mentor">
                            <option value="0">Вы</option>
                            <option value="1">Наставник</option>
                        </select>
                        <small v-if="mentorError">{{authorError}}</small>
                    </div>
                    <div class="form-group">
                        <select :class="['form-control',{invalid:tagError}]"  name="tag" v-model="tag">
                            <option value="1">Bur</option>
                            <small v-if="tagError">{{authorError}}</small>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="term">Срок выполнения </label>
                        <input type="date" id="term" name="term" v-model="term">
                        <small v-if="termError">{{termError}}</small>
                    </div>
                    <button type="submit"  class="btn btn-primary"  :disabled="isSubmiting">Добавить задание в ИОМ</button>
                    <button type="button"  class="btn btn-info" @click="showModal=false">Отменить</button>
                </form>
            </div>
            <request-filter v-model="filter" ></request-filter>
            <app-loader v-if="loading"></app-loader>
            <div class="exercise-content" v-else>
                <div class="row">
                    <exercise-tbl :exeData="exeData"></exercise-tbl>
                </div>
            </div>
        </div>
    <transition  name="fade"  appear>
        <div class="modal-overlay" v-if="showModal" @click="showModal=false">
        </div>
    </transition>

</template>

<script>
    import {ref,computed,onMounted,watch} from 'vue'
    import ExerciseTbl from "../../../components/request/RequestExerciseTbl";
    import AppLoader from "../../../components/ui/AppLoader";
    import RequestFilter from "../../../components/request/RequestFilter";
    import {useExerciseForm} from "../../../use/exercise-form";
    import {useStore} from 'vuex'
    import {useRouter} from "vue-router";
    import {useRoute} from 'vue-router'
    export default {
        setup() {
            const store = useStore()
            const route = useRoute()
            const router = useRouter()
            const loading = ref(true)
            const tblA = ref([])
            const showModal = ref(false)
            const filter = ref({})
            //Проверка существует ли текущий ИОМ
            const validIdIom = async() => {
                await store.dispatch('iom/getIomId',route.params)
                await tblA.value.push(store.state['iom'].tblNames)
            }
            validIdIom()

            onMounted(async()=>{
                loading.value = true
                await store.dispatch('iom/getExercisesByIomId',route.params)
                loading.value = false
            })

            const exeData = computed(() => store.getters['iom/getExercisesByIomId']
                .filter(data => (filter.value.title) ? data.title.includes(filter.value.title) : data)
                .filter(data => (filter.value.tag) ? filter.value.tag == data['tag_id'] : data))

            // Задания из текущего ИОМа
            const submit = async function (values)  {
                values['iomId'] = route.params.id
                await store.dispatch('iom/addExercise',{tbl:tblA.value[0][0].subTypeTableIom,values})
                await store.dispatch('iom/getExercisesByIomId',route.params)
                showModal.value = false
                await router.push(`/iom/${route.params.id}/exercise`)
            }
            document.title = "Менеджер индивидуальных образовательных маршрутов"
            return {...useExerciseForm(submit),showModal,close: () => showModal.value = false, exeData, loading, filter}
        },
        components: {ExerciseTbl,AppLoader,RequestFilter}
    }
</script>

<style scoped>
    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 98;
        background-color: rgba(0,0,0, 0.5);
    }

    .modal-form{
        position: fixed;
        top: 27%;
        left: 50%;
        transform: translate(-50%,-27%);
        z-index: 99;
        width: 60%;
        /*max-width:400px;*/
        background-color: #edeef0;
        padding: 60px 60px;

    }
    ul.iom-add {
        list-style-type: none;
    }
    .iom-add li {
        display: inline-block;
        padding: 10px;
        border: 1px solid gray;
        background-color: gray;
        color: #5d5d5d;
    }
    .iom-add li.active {
        color: #edeef0;
    }

</style>