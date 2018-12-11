<template>
    <rtol>
        <div class="rank-detail">
            <div class="bg" ref="bg" :style="bgStyle">
            </div>
            <Header :title="title" :icon="'icon-list'"></Header>
            <div class="bar" ref="bar">
                <div class="play"><i class="icon-play" v-if="date"></i>{{date}}</div>
                <div class="comment"><i class="icon-message" v-if="hot"></i>{{hot}}</div>
            </div>
            <div class="scroll-area">
                <scroll class="song-content" ref="songContent" :data="songList" @scroll="scroll" :listenScroll="true" :probeType="3">
                    <songList ref="songList" :songList="songList" @selectSong="_selectSong" :rank="true"></songList>
                    <loading v-if="!songList.length"></loading>
                </scroll>
            </div>
        </div>
    </rtol>
</template>

<script>
import rtol from 'base/animation/right-to-left'
import {mapGetters,mapActions} from 'vuex'
import {getSongList,getComment} from 'api/rank'
import {createSong,getSongVkey} from 'common/js/song'
import {formateHot} from 'common/js/tools'
import Header from 'base/header/header'
import scroll from 'base/scroll/scroll'
import songList from 'base/disc-songlist/disc-songlist'
import {adaptMiniPlay} from 'common/js/mixin'
import loading from 'base/loading/loading'
export default {
    mixins:[adaptMiniPlay],
    data(){
        return {
            songList:[],
            hot:0,
            date:"",
            day_of_year:"",
            title:"",
            pic:""

        }
    },
    computed:{
        bgStyle(){
            return {
                "background-image":`url(${this.pic})`
            }
        },
        ...mapGetters([
            "singer"
        ])
    },
    components:{
        rtol,Header,scroll,songList,loading
    },
    methods:{
        adaptMiniPlay(playList){
            let bottom = playList.length>0 ? "15%" : 0;
            this.$refs.songContent.$el.style.bottom = bottom;
            this.$refs.songContent.refresh();
        },
        scroll(pos){
            if(pos.y < 0){
                this.$refs.songList.$el.style.boxShadow = "0 -10px 10px rgba(0,0,0,.2)";
            }
            if(pos.y >= 0){
                this.$refs.songList.$el.style.boxShadow = "";
            }
        },
        formateDate(date){
            let n = date.indexOf("_");
            if(n > -1){
                return "第"+date.slice(n+1)+"周"
            }
            return date;
        },
         _getSongList(){
            getSongList(this.singer.id).then( data => {
                this.songList = this._encaseSongList(data.songlist);
                this.hot = formateHot(data.comment_num);
                this.date = this.formateDate(data.date);
                this.day_of_year = data.day_of_year;
                this.pic = data.topinfo.pic_v12;
                this.title = data.topinfo.ListName;
                console.log("--------------------------------------------------")
                console.log("详情信息");
                console.log(data);
                console.log("歌曲列表");
                console.log(this.songList);
                console.log("当前歌手");
                console.log(this.singer);
                console.log("--------------------------------------------------")
                
            })
        },
        _encaseSongList(list){
            let result = [];
            let len=list.length;
            for(var i=0;i<len;i++){
                let item = list[i];
                 if (item.data.songid && item.data.songmid) {
                        if(this.singer.id === 4){
                            var r = (parseFloat(item.in_count)*100).toFixed(0)+"%";
                        }
                        else{
                            var r = parseInt(item.cur_count) - parseInt(item.old_count);
                            r = r===0?"-":r<0?"↓ "+(-r):"↑ "+r;
                        }
                        result.push(createSong(item.data, "",r));
                        
                }
            }
            for(var j=0;j<len;j++){
                let item = result[j];
                getSongVkey(item.mid).then((res) => {
                    let vkey = res.data.items[0].vkey;
                    item.url += vkey;
                })
            }
            return result;
        },
        _selectSong(song,index,filterList){
            this.selectSong({
                list:[...filterList],
                index
            })
        },
        ...mapActions([
            "selectSong"
        ])
    },
    created(){
        this._getSongList();
        getComment(this.singer.id,1,25);
    },
    mounted(){
        this.bgHeight = this.$refs.bg.clientHeight;
        this.$refs.bar.style.top = this.bgHeight+"px"
        this.$refs.songContent.$el.style.top = `${this.bgHeight-10}px`;
    }
}
</script>

<style lang="less" scoped>
.rank-detail{
    animation-duration: 0.3s;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 99;
    background: #fff;
}   
.bg{
    width: 100%;
    height: 0;
    padding-top: 70%;
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
}
.bar{
    width: 100%;
    height: 30px;
    position: absolute;
    line-height: 30px;
    color: #000;
    div{
        display: inline-block;
        width: 50%;
        text-align: center;
        i:nth-child(1){
            margin-right: 10px;
        }
    }
}
.scroll-area{
    position: absolute;
    top: 40px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    .song-content{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
    }
}
</style>
