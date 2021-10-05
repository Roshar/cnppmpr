<template>
    <div class="col-9">
        <h4>Менеджер индивидуальных образовательных маршрутов: Создать новый маршрут</h4>
        <form  @submit.prevent ref="form">
            <div class="form-group">
                <label for="titleIom">Наименование</label>
                <input type="text" :class="['form-control',invalid.titleIomInvalid]" v-model="titleIom" id="titleIom" name="titleIom"  placeholder="Введите название индивидуального образовательного маршрута">
                <small id="titleIomHelp" class="form-text text-muted">Обязательное поле</small>
            </div>
            <div class="form-group">
                <label for="descriptionIom">Краткое описание:</label>
                <textarea class="form-control" v-model="descriptionIom"  id="descriptionIom" name="descriptionIom" placeholder="Здесь вы можете добавить краткое описание"></textarea>
                <small id="descriptionIomHelp" class="form-text text-muted">Необязательное поле</small>
            </div>
            <button type="button" @click="addIom" class="btn btn-primary">Дальше</button>
        </form>
    </div>
</template>

<script>
    import {useStore} from "vuex";
    import {useRouter} from "vue-router";
    import {useRoute} from 'vue-router'
    import{ref} from "vue"

    export default {

        setup() {
            const store = useStore()
            const router = useRouter()
            const route = useRoute()
            let titleIom = ref('')
            let descriptionIom = ref('')
            let invalid = ref({
                titleIomInvalid: '',
                titleExInvalid: '',
            })

            const addIom = async() => {
                if(!titleIom.value ||titleIom.value.length<3 ){
                    invalid.value.titleIomInvalid = "is-invalid"
                }else {
                    await store.dispatch('iom/addNewIom',{
                        title:titleIom.value,
                        description:descriptionIom.value
                    })
                }
            }
            return{
                addIom,
                titleIom,
                descriptionIom,
                invalid,
            }
        },
    }
</script>

<style scoped>
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