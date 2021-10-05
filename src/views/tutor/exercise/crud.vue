<template>
    <div class="col-9">
        <h4>Карта индивидуального образовательного маршрута </h4>
        <button type="button" class="btn btn-info" @click="modal = true">Создать задание</button>
        <div class="exercise-content" >
            <div class="modal-exercise">
                <teleport to="body">
                    <app-modal v-if="modal" title="Создать задание" @close="modal = false"></app-modal>
                </teleport>
            </div>
        <div class="row">
            <exercise-tbl :exe="exe"></exercise-tbl>
        </div>
        </div>
    </div>
</template>

<script>
import {useExerciseForm} from '../../../use/exercise-form'
import ExerciseTbl from "../../../components/ui/ExerciseTbl";
import {ref} from 'vue'
import AppModal from "../../../components/ui/AppModal";
    export default {
        setup() {
            const modal = ref(false)
            document.title = "Менеджер индивидуальных образовательных маршрутов"
            return {...useExerciseForm(),modal,close: () => modal.value = false}
        },
        components: {AppModal, ExerciseTbl,AppModal}
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
    /*.modal-exercise {*/
    /*    display: none;*/
    /*}*/

</style>