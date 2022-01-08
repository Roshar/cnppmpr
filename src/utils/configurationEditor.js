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

module.exports = editorConfig