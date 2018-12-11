<template>
    <div class="song-list">
        <div class="search">
            <input type="text"  v-model="searchText" placeholder="搜索此歌手的歌曲">
        </div>
        <audio ref="audio"></audio>
        <ul>
            <li v-for="(song,index) in filterList" :class="{'c-song':(currentSong && song.id === currentSong.id)}" :key="index" @touchstart.once="audioPlay(song)" @click="_selectSong(song,index,filterList)">
                <div class="song-container">
                    <div class="song-name" >{{song.name | filterCurrent(song.id,currentSong.id)}}</div>
                    <div class="desc">{{_getDesc(song)}}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {filterArray} from 'common/js/tools'
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
    computed:{
        filterList(){
            return filterArray(this.searchText,this.songList,"name");
        },
        ...mapGetters([
            "currentSong",
            "getPlayer",
            "playList"
        ])
    },
    methods:{
        _getDesc(song){
            return `${song.singer} - ${song.album}`
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
}
</script>

<style lang="less" scoped>
@import "~common/stylus/variable";
@import "~common/stylus/mixin";
.song-list{
    background: #fff;
}
    .search{
        width: 100%;
        height: 45px;
        padding: 10px 20px;
        box-sizing: border-box;
        input::-webkit-input-placeholder {
            color: @color-text-d;
            font-size: @font-size-medium-x;
            text-align: center;
        }
        input{
            width: 100%;
            height: 100%;
            border-radius: 2px;
            background: rgba(0, 0, 0, .07)
        }
    }
    ul{
        li{
            width:100%;
            position: relative;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            padding:  0 20px;
            box-sizing: border-box;
            &.c-song{
                padding-left: 17px;
                border-left: 3px solid #000;
            }
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
            .song-name{
                color: @color-theme;
            }
            .desc{
                color: @color-text-d;
                font-size: @font-size-medium;
            }
        }
    }
</style>
