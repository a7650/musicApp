<template>
    <rtol>
    <music-list :title="singer.creator.name" :bg="singer.imgurl" :songList="songList"  class="singer-detail"></music-list>
    </rtol>
</template>

<script>
import musicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getDiscSongList} from 'api/recommend'
import {createSong,getSongVkey} from 'common/js/song'
import rtol from 'base/animation/right-to-left'

export default {
    data(){
        return {
            songList:[]
        }
    },
    computed:{
        ...mapGetters([
            "singer"
        ])
    },
    components:{
        musicList,rtol
    },
    methods:{
        _getDiscSongList(){
            getDiscSongList(this.singer.dissid).then( data => {
                this.songList = this._encaseSongList(data.songlist);
                console.log(this.songList);
            })
        },
        _encaseSongList(list){
            let result = [];
            list.forEach(item => {
                getSongVkey(item.songmid).then((res) => {
                    const vkey = res.data.items[0].vkey;
                    if (item.songid && item.albummid) {
                        result.push(createSong(item, vkey))
                    }
                })
            })
            return result;
        }
    },
    created(){
        this._getDiscSongList();
    }
}
</script>

<style lang="less" scoped>
.singer-detail{
    animation-duration: 0.5s;
}
</style>
