<template>
    <div class="song-list">
        <input type="text" class="search" v-model="searchText" placeholder="搜索此歌手的歌曲">
        <audio ref="audio"></audio>
        <ul>
            <li v-for="(song,index) in filterList" :key="index" @touchstart.once="audioPlay(song)" @click="_selectSong(song,index,filterList)">
                <div class="song-container">
                    <div class="song-name" :style="c_Song(song)">{{song.name | filterCurrent(song.id,currentSong.id)}}</div>
                    <div class="desc">{{_getDesc(song)}}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props:{
        songList:{
            type:Array
        }
    },
    data(){
        return{
            searchText:""
        }
    },
    methods:{
        _getDesc(song){
            return `${song.singer} - ${song.album}`
        },
        c_Song(song){
            if(this.currentSong && song.id === this.currentSong.id){
                return {color:"#ffcd32"}
            }
        },
        _selectSong(song,index,filterList){
            this.$emit("selectSong",song,index,filterList);
        },
        audioPlay(song){
            if(this.playList.length === 0){
                let el = this.getPlayer;
                el.src = song.url;
                el.play();
                el.pause();
            }
        }
    },
    computed:{
        filterList(){
            if(this.searchText.trim() == ""){
                return this.songList
            }
            else{
                return this.songList.filter(item => {
                    return item.name.toLowerCase().indexOf(this.searchText.trim().toLowerCase()) > -1;
                })
            }
        },
        ...mapGetters([
            "currentSong",
            "getPlayer",
            "playList"
        ])
    },
    created(){
    }
}
</script>

<style lang="less" scoped>
@import "~common/stylus/variable";
@import "~common/stylus/mixin";
.song-list{
    padding: 0 20px;
}
    .search{
        width: 100%;
        height: 25px;
        border-radius: 5px;
        border: none;
        background: rgba(0, 0, 0, .3);
        text-align: center;
        color: white;
        
    }
    ul{
        li{
            width:100%;
            position: relative;
            border-bottom: 1px solid rgba(225, 225, 225, .1);
        }
        .song-container{
            width: 100%;
            display: flex;
            flex-direction: column;
            margin-top: 10px;
            div{
                height: 25px;
                flex: 1;
                .no-wrap;
                line-height: 25px;
            }
            .desc{
                color: @color-text-d;
            }
        }
    }
</style>
