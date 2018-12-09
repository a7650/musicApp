<template>
    <div class="music-list">
        <header ref="header">
            <div class="back" @click="back"><i class="icon-back"></i></div>
            <h5 class="title" v-html="title"></h5>
        </header>
        <div class="wrapper" ref="wrapper" :style="wrapperStyle">
            <div class="bg" ref="bg" :style="bgStyle">
                <div class="filter"></div>
            </div>
            <div class="title2">{{title}}</div>
        </div>
        <div class="scroll-area">
            <div class="play" @click="randomPlay" :style="playStyle">随机播放全部歌曲 <i class="icon-play"></i></div>
            <scroll class="song-content" ref="songContent" :data="songList"   @scroll="scroll" :listenScroll="true" :probeType="3" >
                <div class="scroll-bg" ref="scrollBg">
                    <song-list :songList="songList"  @selectSong="_selectSong"></song-list>
                </div>
                <div class="loading-container" v-if="!songList.length"><loading></loading></div>
                
            </scroll>
        </div>
    </div>
</template>

<script>
import scroll from 'base/scroll/scroll'
import SongList from 'base/song-list/song-list'
import loading from 'base/loading/loading'
import {mapActions} from 'vuex'
import {adaptMiniPlay} from 'common/js/mixin'
import {shuffle} from 'common/js/tools'
export default {
    mixins:[adaptMiniPlay],
    data(){
        return{
           scrollY:0,
           bgHeight:0
        }
    },
    props:{
        bg:{
            type:String
        },
        title:{
            type:String
        },
        songList:{
            type:Array
        }

    },
    computed:{
        fbgStyle(){
            return {"background-image":`url(${this.bg})`}
        },
        playStyle(){
            return {
                "top":`${this.bgHeight-70+this.scrollY}px`
            }
        },
        wrapperStyle(){
            if(this.scrollY > 0){
                let bgHeight = this.bgHeight + this.scrollY;
                let scale = bgHeight/this.bgHeight;
                return {
                    "height":`${bgHeight}px`,
                    "padding-top":0,
                } 
            }
        },
        bgStyle(){
            if(this.scrollY > 0){
                let bgHeight = this.bgHeight + this.scrollY;
                let scale = bgHeight/this.bgHeight;
                return {
                    "background-image":`url(${this.bg})`,
                    "transform":`scale(${scale},${scale})`
                } 
            }
            else if(this.scrollY < 0){
                const maxBlur = 30;
                let blur = this.rang(-this.scrollY,this.bgHeight,maxBlur)
                return {
                    "background-image":`url(${this.bg})`,
                    "filter":`blur(${blur}px)`
                }
            }
            else{
                 return {
                    "background-image":`url(${this.bg})`
                }
            }
        }
    },
    watch:{
        
    },
    components:{
        scroll,SongList,loading
    },
    methods:{
        adaptMiniPlay(playingList){
            let bottom = playingList.length>0 ? "10%" : 0;
            this.$refs.songContent.$el.style.bottom = bottom;
            this.$refs.songContent.refresh();
        },
        back(){
            this.$router.back();
        },
        scroll(pos){
            this.scrollY = pos.y;      
        },
        _selectSong(song,index,filterList){
            this.selectSong({
                list:[...filterList],
                index
            })
        },
        randomPlay(){
            let randomList = shuffle(this.songList);
            this.selectSong({
                list:randomList,
                index:0
            })
        },
        rang(now,total,max){
            return Math.min( max*now/total,max)
        },
        ...mapActions([
            "selectSong"
        ])
    },
    mounted(){
        this.bgHeight = this.$refs.bg.clientHeight;//减去40是因为header有40px，scroll外部有一个容器，这个容器的顶部为header的底部，scroll是相对于这个容器定位的，所以减去40px，ul就正好在图片的下面
        this.$refs.songContent.$el.style.top = `${this.bgHeight-40}px`;
    }
}
</script>

<style lang="less" scoped>
@import "~common/stylus/variable";
@import "~common/stylus/mixin";

.music-list{
    position: fixed;
    top: 0;
    left:0;
    bottom: 0;
    right: 0;
    background: @color-background;
    header{
        position: absolute;
        width: 100%;
        height: 40px;
        line-height: 40px;
        z-index: 99;
        font-size: 120%;
        .no-wrap;
    }
    .back{
        float: left;
        width: 10%;
        padding-left: 5px;
        box-sizing: border-box;
    }
    .title{
        float: left;
        width: 80%;
        text-align: center;
        color:#fff;
        .no-wrap;
    }
    .wrapper{
        width: 100%;
        height: 0;
        padding-top: 70%;
        position: relative;
        .bg{
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center top;
            transform-origin: top;
            overflow: hidden;
        }
        .filter{
           position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0,.3);
        }
        .title2{
            width: 100%;
            font-size: 25px;
            text-align: center;
            position: absolute;
            bottom: 35px;
            font-weight: 100;
        }

    }
    .scroll-area{
        width: 100%;
        position: fixed;
        top: 40px;
        bottom: 0;
        overflow: hidden;
        .play{
            width: 150px;
            height: 25px;
            border: 1px solid #fff;
            border-radius: 13px;
            text-align: center;
            line-height: 25px;
            position: absolute;
            left: 50%;
            margin-left: -75px;
            font-size: 15px;
            background: rgba(0, 0, 0,.5);
            color: #fff
        }
    }
    .song-content{
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        .loading-container{
             position: absolute;
            width: 100%;
            top: 50%;;
            transform: translateY(-50%);
        }
        .scroll-bg{
            background:@color-background;
            padding-top:20px;
            min-height: 100%;
        }
    }
}


</style>
