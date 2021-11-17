<template>
    <div class="body">
        <div class="top" @click="openModal">
            <img :src=avatar alt="">
            <div class="user">{{nickname}}</div>
            <div class="arrow"><van-icon name="arrow" class="arrow2"></van-icon></div>
        </div>
        <van-grid :column-num="3" square>
            <van-grid-item icon="photo-o" text="文字" />
            <van-grid-item icon="photo-o" text="文字" />
            <van-grid-item icon="photo-o" text="文字" />
            <van-grid-item icon="photo-o" text="文字" />
        </van-grid>
        <transition name="van-fade">
            <div class="login-modal" v-show="isShow">
                <div class="close-modal" @click="isShow=!isShow"></div>
                <van-form @submit="onSubmit" class="login-form">
                    <van-field
                            v-model="username"
                            name="用户名"
                            label="用户名"
                            placeholder="用户名"
                            :rules="[{ required: true, message: '请填写用户名' }]"
                    />
                    <van-field
                            v-model="password"
                            type="password"
                            name="密码"
                            label="密码"
                            placeholder="密码"
                            :rules="[{ required: true, message: '请填写密码' }]"
                    />
                    <div style="margin: 16px;">
                        <van-button round block type="info" native-type="submit">提交</van-button>
                    </div>
                </van-form>
            </div>
        </transition>
    </div>
</template>

<script>
    import {GoLogin} from "../request/api";

    export default {
        name: "Topic",
        data(){
            return{
                nickname:'用户登录',
                avatar:require('../assets/logo.png'),
                username:'',
                password:'',
                isShow:false
            }
        },
        created() {
            //组件刚创建的时候判断用户有没有登录
            if(localStorage.getItem("token")){
                //如果有就表示登录，填上用户信息
                let userInfo=JSON.parse(localStorage.getItem("userInfo"))
                this.nickname=userInfo.nickname
                this.avatar=userInfo.avatar
            }else{

            }
        },
        methods:{
            onSubmit(values) {
                let username=values["用户名"]
                let pwd=values["密码"]
                GoLogin({
                    username,
                    pwd
                }).then(res=>{
                    if(res.errno==0){
                        this.$toast.success('登陆成功');
                        localStorage.setItem("token",res.data.token)
                        localStorage.setItem("userInfo",JSON.stringify(res.data.userInfo))
                        setTimeout(()=>{
                            this.isShow=!this.isShow
                            this.avatar=res.data.userInfo.avatar
                            this.nickname=res.data.userInfo.nickname
                        },1000)
                    }
                })
            },
            openModal(){
                if(localStorage.getItem("token")){
                    return
                }else{
                    this.isShow=!this.isShow
                }
            }
        }
    }
</script>

<style lang="less">

   .top{
       display: flex;
       font-size: 18px;
       background: blanchedalmond;
       img{
           padding: 10px;
           margin-left: 15px;
           width: auto;
           height: 100px;
           flex:2;
           border-radius: 50%;
       }
       .user{
            flex:5;
            padding-top: 40px;
            padding-left:35px ;
       }
       .arrow{
           position: relative;
           flex:1;
           .arrow2{
               position: absolute;
               right: 0;
               top:34%;
           }
       }

   }
    .login-modal{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top:0;
        z-index: 99;
        .login-form{
            width: 90%;
            background-color: #fff;
            padding-bottom: 0.2rem;
            position: absolute;
            left: 5%;
            top:30%
        }
        .close-modal{
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
        }
    }

</style>