import request from "./request"

//首页的数据请求
export const GetHomeList=()=> request.get("/index/index")

//搜索框的数据请求
export const GetSeaechPopupData=()=> request.get("/search/index")

//获取实时数据列表
export const GetSearchTipsListData=(params)=> request.get("/search/helper",{
    params
})

//获取搜索商品列表数据
export const GetGoodsListData=(params)=> request.get("/goods/list",{params})

//清除历史记录
export const ClearHistory = () =>request.post("/search/clearhistory")

//登录请求
export const GoLogin = (params) =>request.post("/auth/loginByWeb",params)

//产品详情
export const GetGoodsDetailData = (params) =>request.get("/goods/detail",{params})

//相关产品
export const GetGoodsRelatedData = (params) =>request.get("/goods/related",{params})

//获取购物车产品数量
export const GetGoodsCount = ()=>request.get("/cart/goodscount")

//加入购物车
export const AddToCart = (params) =>request.post("/cart/add",params)

//获取购物车数据
export const GetCartData = () =>request.get("/cart/index")

//点击切换商品选中状态
export const ChangeGoodChecked = (params) =>request.post("/cart/checked",params)

//步进器
export const Stepper = (params) =>request.post("/cart/update",params)

//删除商品
export const Delete = (params) =>request.post("/cart/delete",params)