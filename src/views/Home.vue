<template>
  <div class="home">
      <van-search
              v-model="SearchValue"
              shape="round"
              placeholder="请输入搜索关键词"
              disabled
              @click="$router.push('/home/searchPopup').catch(err=>{})"
      />
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="skyblue">
          <van-swipe-item v-for="item in banner" :key="item.id">
              <img :src="item.image_url" alt="" width="100%">
          </van-swipe-item>

      </van-swipe>
      <transition name="van-slide-right">
          <router-view></router-view>
      </transition>

  </div>
</template>

<script>

import {GetHomeList} from "@/request/api"
export default {
  name: 'Home',
    data() {
        return {
            value: 1,
            SearchValue:'',
            banner:[]
        };
    },
  components: {

  },
    created(){
      GetHomeList()
        .then(res=>{

            this.banner=res.data.banner
        })
        .catch(err=>{
            console.log(err)
        })
    }
}
</script>
<style lang="less">
    /*.slide-enter,.slide-leave-to{*/
    /*    //过渡之前的样式*/
    /*    right:-100%*/
    /*}*/
    /*.slide-enter-active,.slide-leave-active{*/
    /*    //过渡属性*/
    /*    transition:right .3s*/
    /*}*/
    /*.slide-enter-to,.slide-leave{*/
    /*    //过渡之后*/
    /*    right:0*/
    /*}*/

</style>