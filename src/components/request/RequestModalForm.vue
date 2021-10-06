<template>
        <div class="col-12">
            <h4 v-if="titleModal"> {{titleModal}}</h4>
            <slot />
            <form @submit.prevent="onSubmit">
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
                    <select :class="['form-control',{invalid:authorError}]" name="author" v-model="author">
                        <option value="1">Вы</option>
                        <option value="2">Наставник</option>
                    </select>
                    <small v-if="authorError">{{authorError}}</small>
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
                <button type="submit"  class="btn btn-primary" :disabled="isSubmiting">Добавить задание в ИОМ</button>
            </form>
            <button class="btn btn-info" @click="$emit('close')">Отменить</button>
        </div>
</template>

<script>
    import {useExerciseForm} from "../../use/exercise-form";
    export default {
        emits:{
           close,
        },
        props: ['titleModal'],
        setup() {
            return {...useExerciseForm()}
        }
    }
</script>

<style scoped>

</style>