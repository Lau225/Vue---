import axios from "axios";

const instance = axios.create({
    baseURL:"http://kumanxuan1.f3322.net:8001",
    timeout:5000
})

//拦截器
instance.interceptors.request.use(config=>{
    //什么时候执行的？        发请求之前执行这个函数
    //可以判断用户有没有登录 如果没有登录就return 请求就不会发出去
    // console.log(config)
    let token = localStorage.getItem("token")
    if(token){
        //携带登录凭证发起请求
        config.headers["X-Nideshop-Token"]=token;
    }
    return config
},err=>{
    return Promise.reject(err)
})

instance.interceptors.response.use(res=>{
    //什么时候执行的？        在接收到响应之前，在执行then方法之前

    return res.data  //返回的res被then方法的res接收
},err=>{
    return Promise.reject(err)
})

export default instance