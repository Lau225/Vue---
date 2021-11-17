<template>
    <div>
        <Tips></Tips>
        <van-checkbox-group v-model="result" :disabled="isEditing">
            <van-checkbox :name="item.id" v-for="item in cartList" :key="item.id" @click="changeChecked(item)">
                <van-swipe-cell>
                <van-card
                    :num="item.number"
                    :price="item.retail_price"
                    :title="item.goods_name"
                    :thumb="item.list_pic_url"
            />
                    <van-stepper v-model="item.number" v-show="isEditing" @change="stepperChange(item)"/>
                    <template #right>
                        <van-button square type="danger" text="删除" @click="delGoods(item.product_id)"/>
                    </template>
                 </van-swipe-cell>
            </van-checkbox>

        </van-checkbox-group>
        <van-submit-bar :price="cartTotal.checkedGoodsAmount*100" button-text="提交订单" @submit="onSubmit">
            <van-checkbox v-model="checkedAll" :disabled="isEditing">全选</van-checkbox>
            <template #tip>
                累计共<span>{{cartTotal.checkedGoodsCount}}</span>件,可点击 <van-button :type="isEditing?'danger':'primary'" size="small" @click="editBtn">
                {{isEditing?'完成编辑':'编辑'}}
            </van-button>
                进行数量修改
            </template>
        </van-submit-bar>
    </div>
</template>

<script>
    import Tips from "../components/Tip"
    import {GetCartData,ChangeGoodChecked,Stepper,Delete} from "../request/api"
    export default {
        name: "Topic",
        components:{
            Tips
        },
        data(){
            return{
                //哪一个商品的checked的值为1，就可以把它的id添加到这个数组
                result:[],
                checked:false,
                //购物车列表数据
                cartList:[],
                //商品总信息
                cartTotal:[],
                //编辑状态的设置
                isEditing:false,
            }
        },
        methods:{
            totalFn(data){
                this.cartList=data.cartList
                this.cartTotal=data.cartTotal
                this.result=[];
                this.cartList.map(item=>{
                    item.checked==1?this.result.push(item.id):''
                })
            },
            onClickEditAddress(){},
            onSubmit(){},
            changeChecked(item){
                if(this.isEditing){
                    return;
                }
                ChangeGoodChecked({
                    isChecked:item.checked==0?1:0,
                    productIds:item.product_id
                }).then(res=>{
                    this.totalFn(res.data)
                })
            },
            editBtn(){
                this.isEditing=!this.isEditing
            },
            stepperChange(item){
                Stepper({
                    goodsId:item.goods_id,
                    id:item.id,
                    number:item.number,
                    productId:item.product_id
                }).then(res=>{
                    this.totalFn(res.data)
                })
            },
            delGoods(pid){
                Delete({
                    productIds:pid.toString()
                }).then(res=>{
                    this.totalFn(res.data)
                })
            }
        },
        created() {
            GetCartData().then(res=>{
                this.totalFn(res.data)
            })
        },
        computed:{
            checkedAll:{
                get(){
                    return this.result.length==this.cartList.length
                },
                set(value){
                    console.log(value)
                    let ids_arr=[]
                    this.cartList.map(item=>{
                        ids_arr.push(item.product_id)
                    })
                    ChangeGoodChecked({
                        isChecked:value?1:0,
                        productIds:ids_arr.join()
                    }).then(res=>{
                        this.totalFn(res.data)
                    })
                },
            }
        }
    }
</script>

<style lang="less">
    .van-checkbox__label{
        flex:1;
    }
    .van-checkbox-group{
        background-color: #fff;
        padding-bottom: 1.5rem;
        .van-checkbox{
            border-bottom:1px solid #ccc;
            padding: 0.1rem 0.15rem;
        }
    }
    .van-submit-bar{
        bottom:0.5rem;
        border-bottom:1px solid #ccc ;
    }
    .van-stepper{
        text-align: right;
    }
    .van-button--square{
        height: 100%;
    }
</style>