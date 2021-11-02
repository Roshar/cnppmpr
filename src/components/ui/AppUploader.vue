<template>
    <div class="pageloader gray-bg">
        <div class="loader">
            <span>Загрузка</span>
            <div class="sp-hydrogen"></div>
        </div>
    </div>
</template>
<style scoped>
    gray-bg{
        background:#eee;
    }
    .pageloader {
        position: fixed;
        top: 0%;
        left: 0%;
        width: 100%;
        height: 100%;
        z-index: 1000000;
        opacity:1;
        overflow: hidden;
        display: table;
    }
    .loader {
        text-align: center;
        display: table-cell;
        vertical-align: middle;
    }
    .loader span{
        color: #4571a3;
        font-weight: 300;
        font-size: 60px;
        display: block;
        margin-top: 40px;
    }
    .sp-hydrogen {
        width: 96px;
        height: 96px;
        clear: both;
        margin: 60px auto;
        position: relative;
        border: 3px #4571a3 solid;
        border-radius: 50%;
        -webkit-animation: spHydro 0.7s infinite linear;
        animation: spHydro 0.7s infinite linear;
    }
    .sp-hydrogen:before, .sp-hydrogen:after {
        content: '';
        position: absolute;
        width: 30px;
        height: 30px;
        background-color: tomato;
        border-radius: 50%;
    }
    .sp-hydrogen:before {
        top: calc( 50% - 15px );
        left: calc( 50% - 15px );
    }
    .sp-hydrogen:after {
        top: -3px;
        left: -3px;
    }

    @-webkit-keyframes spHydro {
        from {
            -webkit-transform: rotate(0deg);
        }
        to {
            -webkit-transform: rotate(359deg);
        }
    }
    @keyframes spHydro {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(359deg);
        }
    }



    .animated {
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }

    .animated.infinite {
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
    }

    @-webkit-keyframes fadeIn {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }

    .fadeIn {
        -webkit-animation-name: fadeIn;
        animation-name: fadeIn;
    }

    @-webkit-keyframes fadeOut {
        0% {
            opacity: 1;
        }

        100% {
            opacity: 0;
        }
    }

    @keyframes fadeOut {
        0% {
            opacity: 1;
        }

        100% {
            opacity: 0;
        }
    }

    .fadeOut {
        -webkit-animation-name: fadeOut;
        animation-name: fadeOut;
    }
</style>