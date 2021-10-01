<template>
<!--    <router-view :key="route.fullPath" />-->
    <div class="col-9">
        <h4>Ваша библиотека индивидуальных образовательных маршрутов</h4>
        <div class="row">
            <div class="col-6">
                <div class="create_iom">
                    <div class="create_iom_block">
                        <div class="create_iom_block_icon_create">
                            <router-link to="/iom/create">+ </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <div class="card">
                    <div class="card-body">
                        <span style="color: #5d5d5d; font-size: .8em">Дата создания:</span>
                        <h5 class="card-title">Наименование ИОМ</h5>
                        <p style="color: #5d5d5d; font-size: .9em">Количество заданий: 0</p>
                        <a href="#" class="btn btn-primary" style="width: 100%">Просмотр</a>
                    </div>
                </div>
            </div>
        </div>

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
            const iomData = ref('sd')
            const token = localStorage.getItem('jwt-token')
            const getD = async() => {
                await store.dispatch('iom/getData',localStorage.getItem('jwt-token'))
            }
            return{
                iomData,
                route
            }
        },
    }
</script>

<style  scoped>
    .create_iom {
        margin:60px 0 60px 0
    }
    .create_iom_block {
        display: flex;
        border:5px dotted grey;
        width: 200px;
        align-items: center;
        justify-content: center;
    }
    .create_iom_block_icon_create {
        font-size: 92px;
        color: grey;
    }

</style>