<template>
    <h2>IOM</h2>
</template>
<script>
    import {useStore} from "vuex";
    import {useRouter} from "vue-router";

    export default {

        setup() {
            const store = useStore()
            const router = useRouter()

            return{

            }
        },
    }
</script>

<style  scoped>

    .outside-block-indent {
        padding:10px 0 10px 0;
    }
    .inside-block-indent {
        margin:10px 0 10px 0;
    }
    ul.counts_module{
        list-style-type: none;
    }
    .counts_module li {
        display: inline-block;
        padding-left: 55px;

    }
    .count {
        text-align: center;
        color: #2a5885;
        font-size: 1.3em;
    }
    .card-flex-container {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .between-s {
        margin-left: 40px;
    }
    .card-body a {
        color: #ffffff;
    }

</style>