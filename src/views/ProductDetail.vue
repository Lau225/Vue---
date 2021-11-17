<template>
    <div>
        <van-swipe class="my-swipe"
                   :autoplay="3000"
                   indicator-color="white">
            <van-swipe-item v-for="item in gallery"
                            :key="item.id">
                <img :src="item.img_url" alt="" width="100%" style="display:block">
            </van-swipe-item>

        </van-swipe>
        <Tip></Tip>
        <div class="info">
            <div class="title">{{info.name}}</div>
            <div class="goods_brief">{{info.goods_brief}}</div>
            <div class="retail_price">{{info.retail_price|RMBformat}}</div>
        </div>
        <van-cell title="展示弹出" is-link @click="isSkuShow=true"/>
        <div class="attribute">
            <h3>商品参数</h3>
            <ul>
                <li v-for="(item,index) in attribute" :key="index">
                    <div class="l">{{item.name}}</div>
                    <div class="r">{{item.value}}</div>
                </li>
            </ul>
        </div>
        <div v-html="goods_desc" class="goods_desc"></div>
        <Products :goodsList="goodsList"></Products>
        <van-sku
                v-model="isSkuShow"
                :sku="sku"
                :goods="goods"
                :hide-stock="sku.hide_stock"
                ref="sku"
        />
        <AppGoodsActive @goToCart="goToCart" :goodsCount="goodsCount"></AppGoodsActive>
    </div>
</template>

<script>
    import {GetGoodsDetailData,GetGoodsRelatedData,GetGoodsCount,AddToCart} from "../request/api"
    import AppGoodsActive from "../components/AppGoodsActive";
    import Tip from '../components/Tip'
    import Products from "../components/Products";
    export default {
        name: "ProductDetail",
        data(){
            return{
                isSkuShow:false,
                sku:{
                    tree:[],
                    hide_stock:false,
                    price:'0',
                    stock_num:0,
                },
                goods:{
                    picture:''
                },
                //轮播图数据
                gallery:[],
                //商品信息
                info:{},
                //商品参数
                attribute:[],
                //商品信息（图片）
                goods_desc:'',
                //相关商品
                goodsList:[],
                //购物车产品数量
                goodsCount:0,
                productList:[]
            }

        },
        created() {
            //发送请求
            GetGoodsDetailData({
                id:this.$route.query.id
            }).then(res=>{
                this.gallery=res.data.gallery
                this.info=res.data.info
                this.attribute=res.data.attribute
                this.goods_desc=res.data.info.goods_desc
                this.goods.picture=res.data.info.list_pic_url
                this.sku.price=res.data.info.retail_price
                this.sku.stock_num=res.data.info.goods_number
                this.productList=res.data.productList
            })
            //发送请求获取相关产品数据
            GetGoodsRelatedData({
                id:this.$route.query.id
            }).then(res=>{
                this.goodsList=res.data.goodsList
            })
            //获取购物车产品数量
            GetGoodsCount().then(res=>{
                this.goodsCount=res.data.cartTotal.goodsCount
            })
        },
        components:{
            Tip,
            AppGoodsActive,
            Products
        },
        methods:{
            goToCart(){
                //如果sku没有展示的话 点击购物车按钮 展示sku
                //如果sku已经在展示的状态下，点击购物车按钮 跳转到购物车页面
                if(this.isSkuShow){
                    //加入购物车
                    //获取要添加商品的数量
                    console.log(this.$refs.sku.getSkuData().selectedNum)
                    //发送请求
                    AddToCart({
                        goodsId:this.$route.query.id,
                        productId:this.productList[0].id,
                        number:this.$refs.sku.getSkuData().selectedNum
                    }).then(res=>{
                        //添加到购物车后做两件事情
                        //1.更新购物车数量
                            this.goodsCount=res.data.cartTotal.goodsCount
                        //2.跳转到购物车页面
                            this.$toast.success("加入购物车成功")
                            setTimeout(()=>{
                                this.$router.push('/cart')
                            },1000)
                    })
                }else{
                    this.isSkuShow=true
                }
            }
        }
    }
</script>

<style lang="less">
    .info{
    background-color: #fff;
    line-height: 0.4rem;
    padding: 0.1rem 0.1rem;
    text-align: center;
    border-bottom: 1px #ccc solid;
    .title{
        font-size: 0.2rem;
    }
    .retail_price{
        color:darkred;
    }
}
    .attribute{
        background-color: white;
        margin-top: 0.2rem;
        padding: 0.1rem 0.168rem;
        h3{
            font-size: 0.1638rem;
            line-height: 0.5rem;
        }
        li {
            line-height: 0.4rem;
            height: 0.4rem;
            background-color: #efefef;
            display: flex;
            margin-bottom: 0.1rem;
            border-radius: 0.05rem;

            .l {
                width: 30%;
                text-align: right;
                margin-right: 0.1rem;
                font-size: 0.12rem;
            }

            .r {
                flex: 1;
                font-size: 0.168rem;
            }
        }
    }
    .goods_desc{
        img{
            display: block;
            width: 100%;
        }
    }

</style>