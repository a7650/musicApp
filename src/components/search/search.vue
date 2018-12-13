<template>
  <transition name="search-content">
    <div class="search-content">
      <div class="bg" @click="closeSearch">
          <div class="tip" v-show="searchList.length">
              共为您找到{{totalNum}}首歌{{"    "+nowNum+"/"+totalNum}}
          </div>
          <div class="tip" v-show="tip" v-html="tipMessage">
                
          </div>
          <div class="back">点击此处返回</div>
      </div>
      <div class="search-detail">
        <transition name="hot">
        <div class="hot" v-show="!searchText">
          <span>热门搜索</span>
          <div class="key">
              <span @click="selectHotKey(item.k)" v-for="(item,index) in hotKey" :key="index">{{item.k}}</span>
          </div>
        </div>
        </transition>
        <scroll class="song-content" :data="searchList" :pullUp="pullUp" @scrollToEnd="scrollToEnd" v-show="searchText" ref="songContent">
            <div>
            <songList :loading="loading" v-show="searchList.length>0"  :songList="searchList" :search="false" @selectSong="_selectSong"></songList>
            </div>
            <loading v-show="!searchList.length" :loadingText="loadingText"></loading>
        </scroll>
      </div>
      <alert v-if="alert" :message="alertMessage" @alertButton="alertButton"></alert>
    </div>
  </transition>
</template>

<script>
import { getHotKey,search} from "api/search"
import songList from 'base/song-list/song-list'
import {_encaseSongList} from 'common/js/song'
import scroll from 'base/scroll/scroll'
import {mapActions} from 'vuex'
import {adaptMiniPlay} from 'common/js/mixin'
import loading from 'base/loading/loading'
import alert from 'base/alert/alert'
const prePage = 20;
export default {
  mixins:[adaptMiniPlay],
  props: ["searchText"],
  data() {
    return {
        hotKey:[],
        page:1,
        searchList:[],
        alert:false,
        alertMessage:"",
        totalNum:0,
        nowNum:0,
        loading:false,
        pullUp:true,
        tip:true,
        tipMessage:"",
        loadingText:""
    };
  },
  computed: {
      otherNum(){
          return this.totalNum-this.nowNum;
      }
  },
  components:{
      songList,scroll,loading,alert
  },
  methods: {
    scrollToEnd(){
        this.searchMore();
    },
    alertButton(index){
        this.alert = false;
    },
    adaptMiniPlay(playList){
        let bottom = playList.length>0 ? "10%" : 0;
        this.$refs.songContent.$el.style.bottom = bottom;
        this.$refs.songContent.refresh();
    },
    closeSearch() {
      this.$emit("closeSearch");
    },
    _getHotKey(){
        getHotKey().then(data => {
            this.hotKey = data.data.hotkey.splice(0,10);
        })
    },
    selectHotKey(k){
       this.$emit("selectHotKey",k);
    },
    _selectSong(song,index){
        if(song.url===""){
            this.alertMessage = "这首歌没有音源,版权方要钱，听听别的吧😁";
            this.alert = true;
            return;
        }
        this.selectSong({
            list:[song],
            index:0
        })
    },
    searchMore(){
        if(this.otherNum<=0){
            this.loading = false;
            return
        }
        this.loading =true;
        var n = prePage;
        this.page++;
        if(this.otherNum<20){
             n = this.otherNum;
        }
        search(this.searchText,this.page,n).then(data => {
            let newList =  _encaseSongList(data.data.song.list);
            this.searchList=this.searchList.concat(newList);
            this.nowNum+=n;
        })

    },
    ...mapActions([
        "selectSong"
    ])
  },
  watch: {
      searchText(val){
          if(this.timer){
              clearTimeout(this.timer);
          }
          this.totalNum = this.nowNum = 0;
          this.searchList=[];
          this.tipMessage = this.loadingText = "在停止输入0.5s后会自动搜索";
          this.tip = true;
          if(val===""){
              return;
          };
          this.page = 1;
          this.timer = setTimeout(() => {
              this.tipMessage = `<i class='icon-search'></i> 正在为您搜索《${this.searchText}》`;
              this.loadingText = "正在搜索";
              search(this.searchText,this.page,prePage).then(data => {
                  console.log(data);
                  let song = data.data.song;
                  if(data.code !== 0  || !song.list.length){
                      this.tipMessage = `搜索不到${this.searchText},换个试试吧`;
                      return;
                  }
                  this.tip = false;
                  this.searchList = _encaseSongList(song.list);
                  this.totalNum = parseInt(song.totalnum);
                  this.nowNum = prePage>=this.totalNum?this.totalNum:prePage;
                  this.loading = prePage>=this.totalNum?false:true;
              })
          }, 500);
      }
  },
  created() {
    this._getHotKey();
  }
};
</script>

<style lang="less" scoped>
@import "~common/stylus/variable";
@import "~common/stylus/mixin";
.search-content {
  position: fixed;
  top: 87px;
  left: 0;
  bottom: 0;
  right: 0;
  background: #fff;
  color: #000;
  z-index: 99;
  .bg {
    position: absolute;
    width: 100%;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.05);
    top: 0;
    div{
        width: 100%;
        height: 15px;
        text-align: center;
    }
    .tip{
        font-size: @font-size-medium;
        color: rgba(0, 0, 0, 1);
        margin-top: 3px;
        .no-wrap();
    }
    .back{
        font-size: @font-size-medium;
        color: rgba(0, 0, 0, 0.5);
        position: absolute;
        bottom: 5px;
        
    }
  }
  .search-detail {
    width: 100%;
    position: absolute;
    top: 40px;
    bottom: 0;
    padding: 10px 20px;
    box-sizing: border-box;
    .hot{
        .key{
            span{
                display: inline-block;
                margin: 10px 10px 0 0;
                padding: 3px 6px;
                font-size: @font-size-medium-x;
                color:#000;
                border: 1px solid rgba(0, 0, 0, 0.2);
                border-radius: 12px;
            }
        }
    }
    .song-content{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        overflow: hidden;
    }
  }
}
.search-content-enter-active,
.search-content-leave-active {
  transition: 0.2s;
}
.search-content-enter,
.search-content-leave-to {
  opacity: 0;
}

.hot-enter,.hot-leave-to{
    margin-top:200px; 
    opacity: 0;
}
.hot-enter-active,.hot-leave-active{
    transition: .5s;
}
</style>


