<template>
<div class="loader-box"  :class="{'inline':type=='inline'}" v-if="show">
    <div class="loader">
        <div class="icon"></div>
    </div>
</div>
</template>

<script>
export default {
    name: "Loader",
    props:['show','type'],
    methods:{
        // fadeEffect = setInterval(() => {
        // // if we don't set opacity 1 in CSS, then
        // // it will be equaled to "" -- that's why
        // // we check it, and if so, set opacity to 1
        // if (!preloader.style.opacity) {
        // preloader.style.opacity = 1;
        // }
        // if (preloader.style.opacity > 0) {
        // preloader.style.opacity -= 0.1;
        // } else {
        // clearInterval(fadeEffect);
        // }
        // }, 100);
    }
};
</script>

<style scoped>
.loader-box {
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: rgba(255,255,255,.8);
    top: 0px;
    left: 0px;
    z-index: 2500;
    display: flex;
    justify-content:center;
    align-items: center;
}
.loader-box.inline{
    /* height: 600px; */
    position: relative;
    background-color: transparent;
}
.loader{
  margin: auto;
    /* background-color: #fff; */
    width: 180px;
    height: 180px;
    /* border-radius: 50%; */
    display: flex;
    justify-content:center;
    align-items: center; 
}
.icon{
   width: 100%;
    height: 100%;
    background: url(~@/assets/img/loader.gif);
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
}
</style>
