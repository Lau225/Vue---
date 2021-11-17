<template>
    <div>
        <van-list
                :finished="finished"
                finished-text="没有更多了"
        >
        <van-cell v-for="item in searchTipsListData"
                  @click="cellClick(item)"
                  :key="item" :title="item" />
        </van-list>
    </div>
</template>

<script>
    export default {
        name: "SearchTipsList",
        data() {
            return {
                finished: true,
            };
        },
        props:["searchTipsListData"],
        methods:{
            cellClick(val){
                this.$emit("cellClick",val)
            }
        }
    }
</script>

<style scoped>

</style>