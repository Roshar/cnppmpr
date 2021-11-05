<template>
    <ckeditor :editor="editor" name="description" v-model="description" :config="editorConfig"></ckeditor>
</template>

<script>
    import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
    import {ref,watch} from 'vue'
    export default {
        setup(props) {
            const editor =  ClassicEditor
            const description = ref()
            const editorConfig = {
                toolbar: {
                    items: [
                        'heading', '|',
                        'alignment', '|',
                        'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
                        'link', '|',
                        'bulletedList', 'numberedList', 'todoList',
                        'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor', '|',
                        'code', 'codeBlock', '|',
                        'insertTable', '|',
                        'outdent', 'indent', '|',
                        'blockQuote', '|',
                        'undo', 'redo'
                    ],
                    shouldNotGroupWhenFull: true
                }
            }


            return {
                editorConfig,
                editor,
                description
            }
        }
    }
</script>

<style scoped>

</style>