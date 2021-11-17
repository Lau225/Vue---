<template>
    <div>
        <ul>
            <li class="eachLi" v-for="item in goodsList" :key="item.id"
                @click="toProductDetail(item.id)">
                <div class="liDiv">
                    <img :src="item.list_pic_url" alt="" width="100%">
                    <div class="productName">{{item.name}}</div>
                    <div class="price">{{item.retail_price|RMBformat}}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props:["goodsList"],
        methods:{
            toProductDetail(id){
                this.$router.push("/productDetail?id="+id)
                setTimeout(()=>{
                    this.$router.go(0)
                },10)
            }
        }
    }
</script>

<style lang="less">
ul{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .eachLi{
        background-color: #fff;
        margin: 10px;
        .liDiv{
            width:160px;
            height: 210px;
        }
        img{
            width:150px;
            height: 150px;
            padding: 3px;
        }
        .productName,.price,img{
            text-align: center;
            font-size: 0.13rem;
        }
        .price{
            color: red;
            margin-top:5px;
            margin-bottom:5px;
        }
    }

}
</style>