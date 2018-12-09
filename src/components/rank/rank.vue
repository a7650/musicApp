<template>
    <div class="rank" ref="rank">
        <scroll :data="topList" class="list-content" ref="listContent">
        <ul class="top-list">
            <li v-for="item in topList" :key="item.id">
                <div class="list-icon">
                    <img v-lazy="item.picUrl">
                </div>
                <div class="list-text">
                    <h5 class="title">{{item.topTitle}}</h5>
                    <ul class="song-list">
                        <li v-for="(song,index) in item.songList" :key="index">
                            <p>{{index+1+" " }}{{song.songname}}<span class="singer-name"> - {{song.singername}}</span></p>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
        <div class="loading-container" v-if="!topList.length"><loading></loading></div>
        </scroll>
    </div>
</template>

<script>
import {getRankList} from 'api/rank'
import scroll from 'base/scroll/scroll'
import loading from 'base/loading/loading'
import {adaptMiniPlay} from 'common/js/mixin'

export default {
    mixins:[adaptMiniPlay],
    data(){
        return{
            topList:[]
        }
    },
    components:{
        scroll,
        loading
    },
    methods:{
        adaptMiniPlay(playList){
            let bottom = playList.length>0 ? "10%" : 0;
            this.$refs.rank.style.bottom = bottom;
            this.$refs.listContent.refresh();
        },
        _getRankList(){
            getRankList().then(data => {
                this.topList=data.topList;
            },err => {
                console.log(err);
            })
        }
    },
    created(){
        this._getRankList();
    }
}
</script>

<style lang="less" scoped>
@import "~common/stylus/variable.less";
@import "~common/stylus/mixin.less";
.rank{
    min-width: 200px;
    position: fixed;
    top: 44px;
    bottom: 0;
    width: 100%;
}
.list-content{
    position: relative;
    height: 100%;
    overflow: hidden;
}
.loading-container{
    position: absolute;
    width: 100%;
    top: 50%;;
    transform: translateY(-50%);
}
.top-list{
    display: flex;
    flex-direction: column;
    &>li{
        margin-top: 10px;
        display: flex;
        box-sizing: border-box;
        padding: 0 10px;
        width: 100%;
    }
    .list-icon{
        flex-basis: 100px;
        img{
            flex-basis: 100px;
            height: 100px;
            width: 100px;
        }
    }
    .list-text{
        flex: 1;
        width:1px;//防止被内容撑开
        height: 100px;
        box-sizing: border-box;
        padding:10px;
        background-color:@color-highlight-background;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        color: @color-text-ll;
        .title{
            font-size: 120%;
            .no-wrap;
        }
        .song-list{
            li{
                font-size:15px;
                margin-top: 5px;
                p{
                   .no-wrap;
                    font-size: 80%;
                }
                .singer-name{
                    color:@color-text-l;
                    white-space: nowrap;
                }
            }
        }
    }
}



</style>


