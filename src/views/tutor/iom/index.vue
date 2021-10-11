<template>
    <div class="col-9">
        <h4>Ваша библиотека индивидуальных образовательных маршрутов</h4>
        <app-loader v-if="loading"></app-loader>
        <div class="content-loader" v-else>
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
            <div class="row" v-if="iomData">
                <div class="col-sm-6">
                    <div class="card" v-for="item in iomData">
                        <div class="card-body">
                            <span style="color: #5d5d5d; font-size: .8em">Дата создания:</span>
                            <h5 class="card-title">{{item.title}}</h5>
                            <p style="color: #5d5d5d; font-size: .9em">Количество заданий: 0</p>
                            <router-link :to="{ path: `/iom/${item['iom_id']}/exercise`}" class="btn btn-primary" style="width: 100%" >Просмотр</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {useStore} from "vuex";
    import {useRoute} from 'vue-router'
    import {ref,computed,onMounted} from 'vue'
    import AppLoader from "../../../components/ui/AppLoader";

    export default {

        setup() {
            const store = useStore()
            const route = useRoute()
            const loading = ref(true)
            const token = localStorage.getItem('jwt-token')
            onMounted(async()=>{
                loading.value = true
                await store.dispatch('iom/getData',token)
                loading.value = false
            })
            return{
                iomData: computed(() => store.state['iom'].iomData),
                route,
                loading
            }
        },
        components: {AppLoader}
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