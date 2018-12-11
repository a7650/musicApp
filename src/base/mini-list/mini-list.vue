<template>
    <div>
        <ul>
            <li v-for="(song,index) in playList" :key="index" @click="_selectSong(song,index)">
                <span class="song-name" :class="{'c-song':(currentSong && song.id === currentSong.id)}">{{song.name | filterCurrent(song.id,currentSong.id)}}</span>
                <span class="singer">-{{song.singer}}</span>
                <span class="icon">
                    <i class="icon-unfavorite"></i>
                    <i class="icon-false" @click.stop="deleteSong(index)"></i>
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters,mapMutations } from 'vuex'


export default {
    computed:{
        ...mapGetters([
            "playList",
            "currentIndex",
            "playMode",
            "currentSong"
        ])
    },
    methods:{
        _selectSong(song,index){
            this.$emit("selectSong",song,index);
        },
        deleteSong(index){
            this.$emit("deleteSong",index);
        }
    }
}
</script>

<style lang="less" scoped>
@import "~common/stylus/variable.less";
@import "~common/stylus/mixin.less";

ul{
    li{
        width: 100%;
        box-sizing: border-box;
        padding: 10px 5%;
        span{
            box-sizing: border-box;
        }
        .no-wrap;
        .song-name,.singer{
            float: left;
            .no-wrap;
        }
        .song-name{
             max-width: 50%;
        }
        .c-song{
            color:rgb(255, 60, 0);
        }
        .singer{
            padding-left: 10px;
            font-size: @font-size-medium;
            color: @color-text-l;
            width: 30%;
        }
        .icon{
            float: right;
            width: 20%;
            i{
                padding: 7px;
            }
        }
    }

}



</style>
