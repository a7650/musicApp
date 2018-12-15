<template>
    <div class="mine">
        <header>
        <router-link tag="div" class="album" to="/mine/myAlbum" replace="">我的歌单</router-link>
        <router-link tag="div" class="history" to="/mine/playHistory" replace="">最近播放</router-link>
        </header>
        <keep-alive><router-view></router-view></keep-alive>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import "~common/stylus/variable";
@import "~common/stylus/mixin";
.mine{
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 0;
    header{
        width: 100%;
        height: 30px;
        position: absolute;
        top: 0;
        display: flex;
        .album,.history{
            flex: 1;
            color:@color-text-d;
            background: rgba(0, 0, 0, .1);        
            text-align: center;
            line-height: 30px;
       }
       .router-link-active{
           background: rgba(0, 0, 0, .05);
           color: #000;
       }
    }
}
</style>
