<template>
    <div class="singer-listview" ref="singerListview">
        <scroll class="singer-content" ref="singerContent">
        <div>
            <div class="search-singer">
                <input type="text" v-model="searchText" placeholder="搜索歌手">
            </div>
            <ul class="singerList">
                <li v-for="(singer,index) in filterSingerList" :key="index"  @click="selectSinger(singer)">
                    <img v-lazy="singer.pic"> <span>{{singer.name}}</span>
                </li>
            </ul>
        </div>
        <div class="loading-container" v-if="!singerList.length"><loading></loading></div>
        </scroll>
    </div>
</template>

<script>
import scroll from 'base/scroll/scroll'
import loading from 'base/loading/loading'
import {adaptMiniPlay} from 'common/js/mixin'

export default {    
    mixins:[adaptMiniPlay],
    props:{
        singerList:{
            type:Array
        }
    },
    data(){
        return {
            searchText:""
        }
    },
    components:{
        scroll,loading
    },
    computed:{
        filterSingerList(){
            if(this.searchText.trim() == ""){
                return this.singerList;
            }
            let searchText = this.searchText.toLowerCase();
            return this.singerList.filter(function(item){
                return item.name.toLowerCase().indexOf(searchText) > -1 ;
            })
        }
    },
    methods:{
        adaptMiniPlay(playList){
            let bottom = playList.length>0 ? "10%" : 0;
            this.$refs.singerListview.style.bottom = bottom;
            this.$refs.singerContent.refresh();
        },
        selectSinger(singer){
            this.$emit('selectSinger',singer);
        }
    }
    
}
</script>

<style lang="less" scoped>
@import "~common/stylus/variable.less";
@import "~common/stylus/mixin.less";

.singer-listview{
    position: fixed;
    top: 44px;
    bottom: 0;
    width: 100%;
    .singer-content{
        height: 100%;
        overflow: hidden;
        padding: 0 20px;
    }
    .loading-container{
        position: absolute;
        width: 100%;
        top: 50%;;
        transform: translateY(-50%);
        margin-left: -20px;
    }
    .search-singer{
        input{
            width: 100%;
            height: 27px;
            background: @color-highlight-background;
            color:gray;
            border-radius: 3px;
            text-align: center;
        }
    }
    .singerList{
        li{
            margin-top: 10px;
            height: 50px;
            // background-color: @color-highlight-background;
            line-height: 50px;
            display: flex;
            align-items: center;
            img{
                flex-basis: 40px;
                height: 40px;
                border-radius: 20px;
                margin-right: 15px;
            }
            span{
                color:@color-text-l;
                .no-wrap;
            }
        }
    }
    
}





</style>
