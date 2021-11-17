<template>
    <div>
        <div class="his-hot" v-show="isShowHistory">
            <div class="hd">
                <h4>历史记录</h4>
                <van-icon name="delete-o" @click="clearHistory"/>
            </div>
            <div class="bd">
                <van-tag
                        plain
                        type="default"
                        v-for="(item,index) in historyListData"
                        :key="index"
                        @click="tagClick(item)"
                >{{item}}</van-tag>

            </div>
        </div>
        <div class="his-hot">
            <div class="hd">
                <h4>热门搜索</h4>
                <van-icon name="delete-o"/>
            </div>
            <div class="bd">
                <van-tag
                        plain
                        :type="[item.is_hot==0?'default':'danger']"
                        v-for="(item,index) in hotKeywordList"
                        :key="index"
                        @click="tagClick(item.keyword)"
                >{{item.keyword}}</van-tag>

            </div>
        </div>
    </div>
</template>

<script>
    import { ClearHistory } from "@/request/api";

    export default {
        name: "HistoryHot",
        props:["historyListData","hotKeywordList"],
        data(){
            return{
                isShowHistory:true
            }
        },
        methods:{
            tagClick(value){
                this.$emit("tagClick",value)
            },
            clearHistory(){
                ClearHistory().then(res=>{
                    if(res.errno==0){
                        //提示语
                        this.$toast.success("删除成功")
                        //隐藏历史记录的盒子
                        this.isShowHistory=false
                    }
                })
            }
        },
    }
</script>

<style lang="less">
    .his-hot{
        background-color: white;
        padding: 0.1rem;
        margin-bottom: 0.2rem;
        .hd{
            display: flex;
            justify-content: space-between;
            font-size: 0.2rem;
            margin-bottom: 0.1rem;
            margin-top: 0.1rem;
        }
        .van-tag{
            margin-right:0.05rem ;
            padding: 0.03rem;
            margin-top: 0.1rem;
        }
    }

</style>