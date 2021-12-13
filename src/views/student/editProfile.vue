<template>
    <div class="col-3">
        <StudentMainMenu></StudentMainMenu>
    </div>
    <div class="col-9">
        <app-loader v-if="loading"></app-loader>
        <div class="content-loader" v-else>
            <div class="row">
                <div class="col-12">

                    <div class="modal-form" v-if="showModal">
                        <div class="row">
                            <div class="col-12">
                            <span style="float:right" @click="fileCleared"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                  <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                  <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                                  </svg>
                            </span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <div  class="my-2 w-64 h-64 object-fill mx-auto" style="padding: 10px 0px">
                                    <img ref="img" id="image" v-if="!errorFormat"  :src="imgSrc"  class="block max-w-full img" style="max-width: 400px;max-height: 400px"/>
                                    <p v-if="errorFormat" style="color: tomato">Вы пытаетесь загрузить файл, формат которого не поддерживается</p>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <form @submit.prevent="onSubmit" method="POST" enctype="multipart/form-data">
                                    <div class="form-group">
                                        <div class="form-group">
                                            <div class="col-lg-10">
                                                <input type="file"  class="filestyle"  accept="image/jpeg, image/png, image/jpg" ref="imgInput"  @change="fileChanged"
                                                       data-classbutton="btn btn-default btn-lg"
                                                       data-input="false" id="filestyle-0" tabindex="-1"
                                                       style="position: fixed; left: -3500px;">
                                                <div class="bootstrap-filestyle input-group">
                                                    <input type="text" class="form-control"  @click="sprint = true" :placeholder="previewSourceName">

                                                    <span class="input-group-btn" tabindex="0">
                                                <label for="filestyle-0" class="btn btn-default btn-lg" >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" fill="currentColor" class="bi bi-card-image" viewBox="0 2 16 16">
                                                      <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                                      <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z"/>
                                                    </svg>
                                                </label>
                                            </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12">
                                            <p>Вы можете загрузить изображение в формате JPG, JPEG, PNG</p>
                                            <p style="font-size: .8em">Если у вас возникают проблемы с загрузкой, попробуйте выбрать фотографию меньшего размера</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <button type="submit" v-if="imgSrc" class="btn btn-outline-primary-send btn-block" >Сохранить</button>
                                        </div>
                                        <div class="col-6">
                                            <button type="button" @click="fileCleared" class="btn btn-outline-secondary btn-block"> Отмена</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div class="content-wallpaper">
                        <h5 >Редактировать профиль </h5>
                        <div class="main-body">
                            <div class="row gutters-sm">
                                <div class="col-md-4 mb-3">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="d-flex flex-column align-items-center text-center">
                                                <img :src="avatar" alt="Слушатель" style="border-radius: .4rem" width="250">
                                                <div class="mt-3">
                                                    <h4>{{name}}</h4>
                                                    <p class="text-secondary mb-1">Слушатель</p>
                                                    <p class="text-muted font-size-sm">Возраст:  {{age}}{{declensionAge(age)}}</p>
                                                    <div class="row">
                                                        <div class="col-12">
                                                            <button class="btn btn-outline-primary btn-block" @click="showModal=true">Изменить фотографию</button>
                                                        </div>
                                                    </div>
                                                    <hr>
                                                    <div class="row">
                                                        <div class="col-12">
                                                            <button class="btn btn-outline-cancel btn-block" @click="goToModule('/')">Отмена</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="col-md-8">
                                    <div class="card mb-3">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">Фамилия</h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    <input type="text" class="form-control" name="surname" id="surname" v-model="surname">
                                                    <small v-if="surnameError" style="color: tomato">Обязательное поле</small>
                                                </div>
                                            </div>
                                            <hr>
                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">Имя</h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    <input type="text" class="form-control" name="name" id="name" v-model="name">
                                                    <small v-if="nameError" style="color: tomato">Обязательное поле</small>
                                                </div>
                                            </div>
                                            <hr>
                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">Отчество</h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    <input type="text" class="form-control" name="patronymic" id="patronymic" v-model="patronymic">
                                                    <small v-if="patronymicError" style="color: tomato">Обязательное поле</small>
                                                </div>
                                            </div>
                                            <hr>

                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">Дата рождения</h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    <input type="date" class="form-control" v-model="birthdayConvert">
                                                </div>
                                            </div>
                                            <hr>
                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">Email-адрес</h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    <input type="email" required class="form-control" name="login" v-model="login">
                                                    <small v-if="loginError" style="color: tomato">Обязательное поле</small>
                                                </div>
                                            </div>
                                            <hr>
                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">Телефон</h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    <input type="text" class="form-control" v-model="phone">
                                                </div>
                                            </div>
                                            <hr>

                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">Пол</h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    <select  class="form-control"  name="gender" id="gender" v-model="gender">
                                                        <option value="">Выбрать пол</option>
                                                        <option value="man" >Муж</option>
                                                        <option value="woman">Жен</option>
                                                    </select>
                                                    <small v-if="genderError" style="color: tomato">Обязательное поле</small>
                                                </div>
                                            </div>
                                            <hr>
                                            <div class="row">
                                                <div class="col-12">
                                                    <button :class="[classBtn]"  @click="updateItem" >Сохранить изменения</button>
                                                </div>
                                            </div>
                                            <hr>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <transition  name="fade" appear>
        <div class="modal-overlay" v-if="showModal" @click="showModal = false">
        </div>
    </transition>
</template>

<script>
    import {useStore} from "vuex";
    import {useRouter, useRoute} from 'vue-router'
    import {declensionAge} from "../../utils/declensionAge"
    import AppLoader from "../../components/ui/AppLoader";
    import StudentMainMenu from "../../components/studentMenu/StudentMainMenu";
    import uniqid from "uniqid";
    import {requiredForm} from "../../utils/requiredForm";
    import {defineComponent,ref,onMounted, onUnmounted, watch, watchEffect} from 'vue'
    import Cropper from 'cropperjs'


    export default defineComponent({

        setup() {
            const store = useStore()
            const router = useRouter()
            const route = useRoute()
            const showModal = ref(false)
            const name = ref();
            const id = ref()
            const surname = ref();
            const patronymic = ref();
            const phone = ref();
            const issetIom = ref()
            const age = ref();
            const birthday = ref();
            const baseUrl = ref(process.env.VUE_APP_URL)
            const avatar = ref();
            const gender = ref();
            const login = ref();
            const area = ref();
            const school = ref();
            const discipline = ref();
            let students = ref();
            let dependencies = ref()
            const errorFormat = ref()
            let tutorId = ref()
            let tutorFio = ref()
            let birthdayConvert = ref()
            let token = store.state['auth'].token;
            const fileReader = new FileReader()
            let statData;
            const classBtn = ref('btn btn-outline-primary btn-block')
            const previewSourceUrl = ref(null)
            const previewSourceName = ref('Выбрать фотографию')
            const nameError = ref(false)
            const surnameError = ref(false)
            const loginError = ref(false)
            const genderError = ref(false)
            const loading = ref(true)
            let uploadImage;

            let error = ref({})
            let errorSchemaRequired = {
                name: true,
                surname: true,
                login: true,
                gender: true,
            }
            let invalid = ref({
                title: 'title',
                tag: 'tag',
                discipline: 'discipline',
            })

            const imgInput = ref(null)
            const selectedFile = ref(null )
            const imgSrc = ref(null)
            const img = ref(null)
            let cropper = null


            fileReader.onload = (event) => {
                imgSrc.value = event.target.result
            }

            const fileChanged = (e) => {
                const files = e.target.files || e.dataTransfer.files;
                errorFormat.value = false
                previewSourceName.value = files[0].name
                if(files.length) {
                    selectedFile.value = files[0]
                    if(img.value) {
                        cropper = new Cropper(img.value, {
                            // aspectRatio:1,
                            minCropBoxWidth:300,
                            minCropBoxHeight:440,
                            minCanvasWidth:100,
                            viewMode:2,
                            dragMode: 'move',
                            background:false,
                            cropBoxMovable:true,
                            cropBoxResizable:false,
                            setCropBoxData: { width: 160, height: 80 }
                        })
                    }
                }
            }

            const fileCleared = () => {
                selectedFile.value = null
                showModal.value = false
                previewSourceName.value = 'Выбрать фотографию'
            }

            const goToModule = async(r) => {
                await router.push(`/${r}`)
            }

            const genderVal = (val) => {
                return (val == 'man') ? 'муж': 'жен'
            }

            watchEffect(() => {
                if(selectedFile.value) {
                    fileReader.readAsDataURL(selectedFile.value)
                }else {
                    imgSrc.value = null;
                }
            })

            watch([name,surname,login,gender], (values)=>{
                if(values[0] !== '') {
                    nameError.value = ''
                }else {
                    nameError.value = true
                }
                if(values[1] !== '') {
                    surnameError.value = ''
                }else {
                    surnameError.value = true
                }
                if(values[2] !== '') {
                    loginError.value = ''
                }else {
                    loginError.value = true
                }
                if(values[3] !== '') {
                    genderError.value = ''
                }else {
                    genderError.value = true
                }

            })

            watch(imgSrc,() =>{

                    if(imgSrc.value) {
                        cropper.replace(imgSrc.value)
                    }
                }, {
                    flush: 'post'
                }
            )

            const updateItem = async(status) => {
                requiredForm('input',errorSchemaRequired,error)
                requiredForm('select',errorSchemaRequired,error)
                nameError.value = error.value?.name
                surnameError.value = error.value?.surname
                loginError.value = error.value?.login

                if(Object.keys(error.value).length === 0) {
                    await store.dispatch('student/updateStudentProfile',{
                        token: localStorage.getItem('jwt-token'),
                        name: name.value,
                        surname: surname.value,
                        patronymic: patronymic.value,
                        birthday: birthdayConvert.value,
                        gender: gender.value,
                        login: login.value,
                        phone: phone.value
                    })
                    await router.push('/')
                }

                error.value = {}


            }

            const load = () => {
                id.value = store.state['user'].userData.user_id;
                name.value = store.state['user'].userData.name;
                surname.value = store.state['user'].userData.surname;
                patronymic.value = store.state['user'].userData.patronymic;
                phone.value = store.state['user'].userData.phone;
                age.value = store.state['user'].userData.age;
                birthday.value = store.state['user'].userData.birthday;
                baseUrl.value = process.env.VUE_APP_URL
                avatar.value = baseUrl.value +'/'+store.state['user'].userData.avatar;
                gender.value = store.state['user'].userData.gender;
                login.value = store.state['user'].userData.login;
                school.value = store.state['user'].userData['school_name'];
                area.value = store.state['user'].userData['title_area'];
                birthdayConvert.value = store.state['user'].userData['birthdayConvert'];
                discipline.value = store.state['user'].userData['title_discipline'];
                students.value = (store.state['user'].userLink) ? store.state['user'].userLink['COUNT(*)'] : null
            }

            const onFileSelected = (event) => {
                uploadImage = event.target.files[0]
                previewSourceName.value = uploadImage.name
                previewSourceUrl.value = URL.createObjectURL(uploadImage);
            }


            onMounted(async()=>{
                loading.value = true
                await store.dispatch('user/getUserData',localStorage.getItem('jwt-token'))
                await load()
                loading.value = false
            })


            const onSubmit = async() => {

                const ff = new FormData()
                const generatedPostfix = uniqid()
                const uniqName =   login.value + '_' + generatedPostfix;
                try {
                    cropper.getCroppedCanvas({
                        imageSmoothingQuality: 'high',
                        height: 500,
                        width: 1050,
                        maxWidth: 1050,
                        maxHeight: 500,
                    }).toBlob(async (blob) => {
                        ff.append('file', blob, uniqName)
                        ff.append('user', localStorage.getItem('jwt-token') )
                        selectedFile.value = null
                        imgSrc.value = null
                        previewSourceName.value = 'Выбрать фотографию'
                        await store.dispatch('user/changeAvatar',ff)
                        await load()
                        await router.push('/')
                    })
                }catch(e) {
                    alert(e.message)
                    imgSrc.value = null
                    cropper.destroy
                    console.log(e.message)
                }
                showModal.value = false

                // const ff = new FormData()
                // const uniqName = uniqid()
                // ff.append('file', uploadImage, uniqName)
                // ff.append('user', localStorage.getItem('jwt-token') )
                // await store.dispatch('user/changeAvatar',ff)
                // await load()
                // await router.push('/')
                // showModal.value = false
            }



            return{
                name,
                birthdayConvert,
                surname,
                patronymic,
                school,
                area,
                phone,
                discipline,
                genderVal,
                declensionAge,
                onFileSelected,
                previewSourceUrl,
                previewSourceName,
                onSubmit,
                avatar,
                gender,
                birthday,
                classBtn,
                surnameError,
                nameError,
                loginError,
                genderError,
                updateItem,
                age,
                login,
                goToModule,
                showModal,
                issetIom,
                tutorId,
                tutorFio,
                errorFormat,
                fileChanged,
                fileCleared,
                imgSrc,
                img,
                imgInput,
                selectedFile,

            }
        },
        components: {StudentMainMenu,AppLoader}
    })
</script>

<style  scoped>

    .btn-outline-cancel {
        color: tomato;
        border-color: tomato;
    }
    .btn-outline-cancel:hover {
        color: #fff;
        background-color: tomato;
        border-color: tomato;
    }

    .modal-overlay,.modal-overlay2 {
        position: fixed;
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
        width: 100%;
        max-width:800px;
        background-color: #fafbfc;
        padding: 1.5em 1.5em;
    }
    .bi-card-image {
        color: #4571a3;
    }

    .btn-outline-primary-send{
        color: #fff;
        background-color: #4571a3;
        border-color: #4571a3;
    }
    .btn-outline-primary:hover {
        color: #fff;
        background-color: #4571a3;
        border-color: #4571a3;
    }

    ul.ul-style {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }
    .container-st {
        padding: 14px;
    }
    .feature-box-1 {
        padding: 32px;
        box-shadow: 0 0 30px rgba(31, 45, 61, 0.125);
        margin: 15px 0;
        position: relative;
        z-index: 1;
        border-radius: 10px;
        overflow: hidden;
        -moz-transition: ease all 0.35s;
        -o-transition: ease all 0.35s;
        -webkit-transition: ease all 0.35s;
        transition: ease all 0.35s;
        top: 0;
        min-height: 300px;
    }
    .feature-box-1 * {
        -moz-transition: ease all 0.35s;
        -o-transition: ease all 0.35s;
        -webkit-transition: ease all 0.35s;
        transition: ease all 0.35s;
    }
    .feature-box-1 .icon {
        width: 70px;
        height: 70px;
        line-height: 70px;
        background: #fc5356;
        color: #ffffff;
        text-align: center;
        border-radius: 50%;
        margin-bottom: 22px;
        font-size: 27px;
    }
    .feature-box-1 .icon i {
        line-height: 70px;
    }
    .feature-box-1 h5 {
        color: #20247b;
        font-weight: 600;
    }
    .feature-box-1 p {
        margin: 0;
    }
    .feature-box-1 {
        background-color: #ffffffdb;
    }
    .feature-box-1:after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: auto;
        right: 0;
        border-radius: 10px;
        width: 0;
        background: #4571a3;
        z-index: -1;
        -moz-transition: ease all 0.35s;
        -o-transition: ease all 0.35s;
        -webkit-transition: ease all 0.35s;
        transition: ease all 0.35s;
        cursor: pointer;
    }
    .feature-box-1:hover {
        top: -5px;
    }
    .feature-box-1:hover h5 {
        color: #ffffff;
    }
    .feature-box-1:hover p,
    .feature-box-1:hover .ul-style li {
        color: rgba(255, 255, 255, 0.8);
    }
    .feature-box-1:hover:after {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        left: 0;
        right: auto;
    }
    .section {
        padding: 50px 0;
        position: relative;
    }
    .section-title {
        padding-bottom: 45px;
    }
    .section-title h2 {
        font-weight: 700;
        color: #4571a3;
        font-size: 45px;
        margin: 0 0 15px;
        border-left: 5px solid tomato;
        padding-left: 15px;
    }




    .content-wallpaper, .tutor-left-main-menu {
        margin-top: 1.5rem;
        background-color: white;
        color: #5d5d5d;
    }

    .btn-outline-primary {
        color: #4571a3;
        border-color: #4571a3;
    }
    .btn-outline-primary:hover {
        color: #fff;
        background-color: #4571a3;
        border-color: #4571a3;
    }

    .card.page_info_wrap {
        border: none;
    }

    .content-wallpaper {
        padding: 25px;
    }

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