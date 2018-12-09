<template>
    <rtol>
        <music-list :title="singer.name" :bg="singer.pic" :songList="songList"  class="singer-detail"></music-list>
    </rtol>
</template>


<script>
import rtol from 'base/animation/right-to-left'
import scroll from 'base/scroll/scroll'
import {mapGetters} from 'vuex'
import {getSongList} from 'api/singer'
import {createSong,getSongVkey} from 'common/js/song'
import MusicList from 'components/music-list/music-list'

export default {
    data(){
        return {
            songList:[],
            songList2:[]
        }
    },
    computed:{
        ...mapGetters([
            'singer'
        ])
    },
    methods:{
        _getSongList(){
            getSongList(this.singer.mid,0,30).then( data => {
                this.songList = this._encaseSongList(data.list);
                this.songList2 =this._encaseSongList(data.list);//传递的都是对象的引用
            })
        },
        _encaseSongList(list){
            let result = [];
            list.forEach(item => {
                let {musicData} = item;
                getSongVkey(musicData.songmid).then((res) => {
                    const vkey = res.data.items[0].vkey;
                    if (musicData.songid && musicData.albummid) {
                        result.push(createSong(musicData, vkey))
                    }
                })
            })
            return result;
        }

    },
    components:{
        rtol,scroll,MusicList
    },
    created(){
        this._getSongList();
    }


}

</script>



<style lang="less" scoped>
@import "~common/stylus/variable.less";

    .singer-detail{
        z-index: 100;
        animation-duration: 0.3s;
    }
</style>

