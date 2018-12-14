<template>
  <ani>
    <div class="handles" ref="handles">
      <span v-for="(item,index) in songMore" :key="index" @click.stop="songHandle(index)">{{item}}</span>
    </div>
  </ani>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import ani from "base/animation/mini-list-animation";
export default {
  props: ["currentSelect"],
  data() {
    return {
      songMore: ["添加到收藏", "添加到歌单", "下一首播放", "取消"]
    };
  },
  computed: {
    ...mapGetters(["playList"])
  },
  components: {
    ani
  },
  methods: {
    addFavorite(song) {
      console.log("你把" + song.name + "添加到个人收藏");
    },
    addOther(song) {
      console.log("你把" + song.name + "添加到其他歌单");
    },
    nextPlay(song) {
      console.log("下首将播放" + song.name);
    },
    songHandle(index) {
      switch (index) {
        case 0:
          this.addFavorite(this.currentSelect);
          this.$emit("closeSongHandles");
          break;
        case 1:
          this.addOther(this.currentSelect);
          this.$emit("closeSongHandles");
          break;
        case 2:
          this.nextPlay(this.currentSelect);
          this.$emit("closeSongHandles");
          break;
        case 3:
          this.$emit("closeSongHandles");
          break;
      }
    }
  },
    mounted() {
      this.$nextTick(() => {
        if (this.playList.length) {
          this.$refs.handles.style.bottom = "8%";
        }
      });
    }
};
</script>

<style lang="less" scoped>
@import "~common/stylus/variable";
@import "~common/stylus/mixin";
.handles {
  animation-duration: 0.2s;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  z-index: 99;
  background: #fff;

  span {
    width: 100%;
    flex: 1;
    text-align: center;
    line-height: 50px;
    color: #000;
    border-top: 1px solid rgba(0, 0, 0, .05);
  }
}
</style>
