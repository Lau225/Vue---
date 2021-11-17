<template>
  <div id="app">
    <router-view/>
    <AppTabbar v-show="$route.meta.Tabbar"></AppTabbar>
  </div>
</template>
<script>
  import AppTabbar from "./components/AppTabbar";
  export default {
    components:{
      AppTabbar
    },
    created() {
      console.log(this.$route.meta.Tabbar)
    }
  }
</script>
<style lang="less">
  #app{
    background-color: #efefef;
    min-height: 100%;
    font-size:0.14rem
  }
  body,html{
    height: 100%;
  }
  html{
    font-size:100px!important; //1px=0.01rem  16px=0.16rem
  }

</style>
