<template>
     <div>
         <van-dropdown-menu>
             <van-dropdown-item  title="综合" disabled/>
             <van-dropdown-item  @change="priceChange" title="价格"  v-model="priceVal" :options="option2" />
             <van-dropdown-item  @change="categoryChange" title="分类" v-model="categoryVal" :options="filterCategory" />
         </van-dropdown-menu>
         <van-empty v-if="goodsList.length==0" image="search" description="没有要搜索的商品" />
         <Products  v-else :goodsList="goodsList"></Products>
     </div>
</template>

<script>
    import Products from "./Products";
    export default {
        data() {
            return {
                priceVal: '',
                categoryVal: 0,
                option2: [
                    { text: '价格由高到低', value: 'desc' },
                    { text: '价格由低到高', value: 'asc' },

                ],
            };
        },
        components:{
            Products
        },
        methods:{
            categoryChange(value){
                this.$emit("categoryChange",value)
            },
            priceChange(value){
                this.$emit("priceChange",value)
            }
        },
        props:["filterCategory","goodsList"],
        beforeUpdate() {
                //数据挂在完毕，遍历FilterCategory数组，看看哪一项的checked为true
                this.filterCategory.map(item=>{
                    if(item.checked){
                        this.categoryVal=item.value
                        return
                    }
                })

        }
    }
</script>

<style scoped>

</style>