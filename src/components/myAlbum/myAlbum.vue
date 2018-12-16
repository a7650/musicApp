<template>
  <div class="my-album">
    <scroll class="album-content" ref="albumContent">
      <div>
        <div class="my-create-album album" >
        <header>我创建的歌单</header>
      <div v-for="(item,index) in createAlbum" class="album" :key="index" @click="selectCreateAlbum(item)">
        <img :src="albumBg(item)">
        <div class="desc">{{item.name}}({{item.songList.length}})</div>
        <i class="icon-right"></i>
      </div>
    </div>
    <div class="my-collect-album album" v-if="collectAlbum.length">
      <header>我收藏的歌单</header>
      <div v-for="(item,index) in collectAlbum" class="album" :key="index" @click="selectCollectAlbum(item)">
        <img :src="albumBg(item)">
        <div class="desc">{{item.name}}</div>
        <i class="icon-right"></i>
      </div>
    </div>
    <div v-for="i in refreshAlbum" ></div>
      </div>
    </scroll>
    <div class="my-collect-album"></div>
    <router-view></router-view>
  </div>
</template>

<script>
import scroll from 'base/scroll/scroll'
import { adaptMiniPlay } from "common/js/mixin";
import {getCreateAlbum,getCollectAlbum} from 'common/js/cache'
import {mapMutations,mapGetters} from 'vuex'
export default {
    mixins: [adaptMiniPlay],
  components:{
    scroll
  },
  data(){
    return{
      createAlbum:[],
      collectAlbum:[]
    }
  },
  computed: {
      refreshAlbum(){
        var m = this.myAlbum;
         this.createAlbum = getCreateAlbum();
         this.collectAlbum = getCollectAlbum();
         return m;
      },
     ...mapGetters([
       "myAlbum"
     ])
  },
  methods:{
    adaptMiniPlay(playList){
      let bottom = playList.length > 0 ? "10%" : 0;
      this.$refs.albumContent.$el.style.bottom = bottom;
      this.$refs.albumContent.refresh();
    },
    albumBg(item){
      let url = item.bgUrl;
      return url?url:require('base/album/default.png') 
    },
    selectCreateAlbum(item){
        this.$router.push({
            name:'myAlbumDetail',
            params:{
                id:item.name
            }
        }

        )
    },
    selectCollectAlbum(item){
      this.$router.push({
        name:"collectAlbumDetail",
        params:{
          id:item.dissid
        }
      })
      this.SET_SINGER(item);
    },
    ...mapMutations([
      "SET_SINGER"
    ])
  },
  mounted(){
    this.$refs.albumContent.refresh();
  },
  created(){
    this.createAlbum = getCreateAlbum();
    this.collectAlbum = getCollectAlbum();
  },
  activated(){
    this.createAlbum = getCreateAlbum();
    this.collectAlbum = getCollectAlbum();
    this.$refs.albumContent.refresh();

  }
};
</script>

<style lang="less" scoped>
@import "~common/stylus/variable.less";
@import "~common/stylus/mixin.less";
.my-album {
  position: fixed;
  top: 74px;
  left: 0;
  bottom: 0;
  right: 0;
  color: #000;
  .album-content{
    position: absolute;
    top:10px;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
  }
  .album {
    width: 100%;
    header{
        width: 100%;
        height: 20px;
        font-size: @font-size-medium;
        background: rgba(0, 0, 0, 0.05);
        box-sizing: border-box;
        padding-left: 20px;
        line-height: 20px;
    }
    .album {
      width: 100%;
      height: 40px;
      background: #fff;
      margin-top: 10px;
      color: #000;
      box-sizing: border-box;
      padding-left: 20px;
      display: flex;
      justify-content: center;
      img {
        width: 40px;
        height: 40px;
      }
      .desc {
        flex: 1;
        line-height: 40px;
        padding-left: 20px;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        .no-wrap();
      }
      i {
        width: 30px;
        height: 40px;
        text-align: left;
        line-height: 40px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        color: rgba(0, 0, 0, .4);
      }
    }
  }
}
</style>
