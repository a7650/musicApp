<template>
  <rtol>
    <div class="create-album-detail">
        <Header icon="icon-more" :title="this.name" @clickMore="clickMore"></Header>
        <Album :songList="songList" :name="name" :bgUrl="bgUrl" :desc="desc" @_selectMore="selectMore"></album>
        <filter-bg v-if="songHanders||albumHanders" @click.native="closeHanders"></filter-bg>
        <float v-if="float" :float_message="float_message"></float>
        <song-handle :othersHander="othersHander" v-if="songHanders" @othersHandle="othersHandle"></song-handle>
        <song-handle :othersHander="albumHander" v-if="albumHanders" @othersHandle="othersHandle"></song-handle>
        <alert v-if="alert" :message="alertMessage" :button="alertButton" @alertButton="selectAlert"></alert>
    </div>
  </rtol>
</template>

<script>
import rtol from "base/animation/right-to-left"
import {getCreateAlbum,deleteFromAlbum} from 'common/js/cache'
import Header from 'base/header/header'
import Album from 'base/album/album'
import {_getLyric} from 'api/song'
import Float from 'base/float/float'
import filterBg from 'base/filter-bg/filter-bg'
import songHandle from 'base/songHandle/songHandle'
import {mapMutations} from "vuex"
import {float } from "common/js/mixin"
import alert from 'base/alert/alert'
import {deleteAlbum} from 'common/js/cache'
export default {
    mixins: [float],
    data(){
        return{
            songHanders:false,
            selectSong:null,
            selectIndex:-1,
            songList:[],
            name:"",
            bgImg:"",
            desc:"",
            othersHander:[
                {type:"_delete",mes:"从歌单中删除"},
                {type:"_nextPlay",mes:"下一首播放"},
                {type:"_close",mes:"取消"}
            ],
            albumHander:[
                {type:"_editDesc",mes:"编辑简介"},
                {type:"_deleteAlbum",mes:"删除歌单"},
                {type:"_close",mes:"取消"}
            ],
            albumHanders:false,
            alertMessage:"",
            alertButton:[],
            alert:false
        }
    },
  components: {
    rtol,Header,Album,Float,songHandle,filterBg,alert
  },
  methods:{
      _alert(mes,button){
          this.alertMessage = mes;
          this.alertButton = button;
          this.alert = true;
      },
      selectAlert(index){
          if(index === 0){
              this.alert = false;
              this.closeHanders();
          }
          if(index === 1){
            this.alert = false;
            this.closeHanders();
            let m = deleteAlbum(this.name)
            this.mixin_float(m.mes);      
            if(m.type === 1){
                this.REFRESH_MYALBUM();
            }
        }
      },
      _editDesc(){
          console.log("edit");
          this.closeHanders();
      },
      _deleteAlbum(){
          this._alert("确定删除吗",["取消","确定"]);
      },
      clickMore(){
          this.albumHanders = true;
      },
      _getCreateAlbum(){
          let album = getCreateAlbum(this.name);
          if(album.songList.length){
              this.songList = album.songList.map(item=>{
               item.getLyric=function(){
                    if(this.lyric){
                    return Promise.resolve(this.lyric)
                    }
                    else{
                        return new Promise((resolve,reject) => {
                            _getLyric(this.mid).then(data => {
                                if(data.retcode == 0){
                                    this.lyric = Base64.decode(data.lyric);
                                    resolve(this.lyric);
                                }
                                else{
                                    reject("暂无歌词")
                                }
                            })
                        })
                    }
               }
               return item;
          });
          }
          this.name = album.name;
          this.bgUrl = album.bgUrl;
          this.desc = album.desc;
      },
      closeHanders(){
          this.songHanders = false;
          this.selectSong = null;
          this.selectIndex = -1;
          this.albumHanders = false;
      },
      selectMore(song,index){
          this.songHanders = true;
          this.selectIndex = index;
          this.selectSong = song;
      },
      othersHandle(type){
          this[type]();
      },
      _delete(){
          let m = deleteFromAlbum(this.name,this.selectSong);
          this.mixin_float(m.mes);
          if(m.type === 1){
              this.songList.splice(this.selectIndex,1);
          }
          this.closeHanders();

      },
     _nextPlay(){
          this.NEXT_PLAY(this.selectSong);
          this.mixin_float("已添加到下一首播放队列");
          this.closeHanders();
      },
      _close(){
          this.closeHanders();
      },
      ...mapMutations(["NEXT_PLAY","REFRESH_MYALBUM"])
  },
  created(){
      this.name = this.$route.params.id;
      this._getCreateAlbum()
  }
};
</script>

<style lang="less" scoped>
@import "~common/stylus/variable.less";
@import "~common/stylus/mixin.less";
.create-album-detail {
  animation-duration: .3s;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  color: #000;
}
</style>
