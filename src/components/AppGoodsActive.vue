<template>
    <div>
        <van-goods-action>
            <van-goods-action-icon
                    :icon="isCollected?'star':'star-o'"
                    :text="isCollected?'已收藏':'未收藏'"
                    :color="isCollected?'red':'#333'"
                    @click="isCollected=!isCollected"
            />
            <van-goods-action-icon icon="cart-o" text="购物车" :badge="goodsCount" color="#333" />
            <van-goods-action-button type="warning" text="加入购物车" @click="goToCart"/>
            <van-goods-action-button type="danger" text="立即购买"  @click="handleClick"/>
        </van-goods-action>
    </div>
</template>

<script>
    export default {
        name: "AppGoodsActive",
        data(){
            return{
                isCollected:false
            }
        },
        props:["goodsCount"],
        methods:{
            handleClick(){
                this.$toast('功能未开放')
                console.log(this.goodsCount)
            },
            goToCart(){
                this.$emit("goToCart")
            }
        }

    }
</script>

<style scoped>
.van-goods-action{
    z-index: 9999;
}
</style>