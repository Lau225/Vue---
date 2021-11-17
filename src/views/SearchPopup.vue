<template>
    <div class="search-popup">
        <van-search
                v-model="searchValue"
                show-action
                :placeholder="placeholderVal"
                @search="onSearch"
                @cancel="onCancel"
                @input="onInput"
        />
        <HistoryHot v-if="blockShow==1" :historyListData="historyListData"
        :hotKeywordList="hotKeywordList"
        @tagClick="tagClick"
        >
        </HistoryHot>
        <SearchTipsList v-else-if="blockShow==2"
         :searchTipsListData="searchTipsListData"
         @cellClick="tagClick"
        >
        </SearchTipsList>
        <SearchProducts v-else
                        :filterCategory="filterCategory"
                        :goodsList="goodsList"
                        @categoryChange="categoryChange"
                        @priceChange="priceChange"
        ></SearchProducts>
    </div>

</template>

<script>
    import HistoryHot from "../components/HistoryHot";
    import SearchTipsList from "../components/SearchTipsList";
    import SearchProducts from "../components/SearchProducts";
    import {GetSeaechPopupData,GetSearchTipsListData,GetGoodsListData} from "../request/api"
    export default {
        data(){
            return{
                //搜索的文字
                searchValue:'',
                //提示文本
                placeholderVal:'',
                blockShow:1,
                //历史记录的列表数据
                historyListData:[],
                //热门搜索的列表数据
                hotKeywordList:[],
                //搜索提示实时的列表数据
                searchTipsListData:[],
                //搜索产品内容的分类数据
                filterCategory:[],
                //搜索产品内容的数据列表
                goodsList:[],
                //价格排序：（由高到低或低到高）
                order:"desc",
                //分类id
                categoryId:0,
                //默认搜索的方式  是id还是price
                sort:"id"
            }
        },
        methods: {
            categoryChange(value){
                this.categoryId=value
                //发送搜索商品的请求
                this.onSearch(this.searchValue)
            },
            tagClick(value){
                this.onSearch(value)
            },
            priceChange(value){
                this.order=value;
                this.sort="price"
                this.onSearch(this.searchValue)
            },
            onSearch(val) {
                this.blockShow=3;
                GetGoodsListData({
                    keyword:val,
                    page:1,
                    size:10,
                    order:this.order,
                    categoryId:this.categoryId,
                    sort:this.sort
                }).then(res=>{
                    if(res.errno==0){
                        let newArray=JSON.parse(JSON.stringify(res.data.filterCategory)
                            .replace(/name/g,'text')
                            .replace(/id/g,'value'))
                        this.filterCategory=newArray;
                        this.goodsList=res.data.goodsList;
                    }
                })
            },
            onCancel() {
                this.$router.go(-1)
            },
            onInput(val){
                this.blockShow=2;
                //发送请求，获取实时搜索的文本列表
                GetSearchTipsListData({keyword:val}).then(res=>{
                    if(res.errno==0){
                        console.log(res)
                        this.searchTipsListData=res.data
                    }
                })
            }
        },
        components:{
            SearchProducts,
            HistoryHot,
            SearchTipsList,
        },
        created() {
            GetSeaechPopupData().then(res=>{
                if(res.errno==0){
                    this.placeholderVal=res.data.defaultKeyword.keyword
                    this.historyListData=res.data.historyKeywordList
                    this.hotKeywordList=res.data.hotKeywordList
                }
            })
        }
    }
</script>

<style scoped>
.search-popup{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background-color: #efefef;
}
</style>