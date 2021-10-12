<template>
    <div class="col-9">
        <h4>Библиотека заданий</h4>
        <button type="button" class="btn btn-info" @click="showModal = true">Добавить задание в библиотеку</button>
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
                    <label for="link">Тип задания</label>
                    <select :class="['form-control',{invalid:tagError}]"  name="tag" v-model="tag">
                        <option v-for="(item, index) in tagsData"  :key="item['id_tag']"   :value="item['id_tag']">{{item['title_tag']}}</option>
                        <small v-if="tagError">{{tagError}}</small>
                    </select>
                </div>
                <button type="submit"  class="btn btn-primary"  :disabled="isSubmiting">Добавить задание в библиотеку</button>
                <button type="button"  class="btn btn-info" @click="showModal=false">Отменить</button>
            </form>
        </div>
        <request-filter  v-model="filter" :tags-data="tagsData" ></request-filter>
        <app-loader v-if="loading"></app-loader>
        <div class="exercise-content" v-else>
            <div class="row">
                <library-list :libraryData="libraryData"></library-list>
            </div>
        </div>
    </div>
    <transition  name="fade" appear>
        <div class="modal-overlay" v-if="showModal" @click="showModal=false">
        </div>
    </transition>

</template>

<script>
     import {ref,computed,onMounted,watch} from 'vue'
     import LibraryList from "../../../components/request/RequestLibrary";
     import AppLoader from "../../../components/ui/AppLoader";
     import RequestFilter from "../../../components/request/RequestFilter";
     import {useLibraryForm} from "../../../use/library-form";
     import {useStore} from 'vuex'
     import {useRouter} from "vue-router";
     import {useRoute} from 'vue-router'

     export default {
         setup() {
             const store = useStore()
             const route = useRoute()
             const router = useRouter()
             const loading = ref(true)
             const showModal = ref(false)
             const filter = ref({})
             const tagsData = ref()

             onMounted(async()=>{
                 loading.value = true
                 await store.dispatch('library/getLibraryData',{token: localStorage.getItem('jwt-token')})
                 tagsData.value = await store.dispatch('tag/getTag')
                 loading.value = false
             })


            // Фильтрация: НАЗВАНИЕ|КАТЕГОРИЯ
             const libraryData = computed(() => store.getters['library/getLibraryData']
                 .filter(data => (filter.value.title) ? data.title.includes(filter.value.title) : data)
                 .filter(data => (filter.value.tag) ? filter.value.tag == data['tag_id'] : data))


             // Задания из текущего ИОМа
             const submit = async function (values)  {
                 await store.dispatch('library/addExercise',{
                     token: localStorage.getItem('jwt-token'),
                     values})
                 await store.dispatch('library/getLibraryData',{token: localStorage.getItem('jwt-token')})
                 showModal.value = false
                 await router.push(`/library`)
             }

             document.title = "Библиотека заданий"
             return {...useLibraryForm(submit),showModal,close: () => showModal.value = false, libraryData, loading, filter, tagsData}
         },
         components: {LibraryList,AppLoader,RequestFilter}
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