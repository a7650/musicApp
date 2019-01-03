<template>
    <div class="first-loading">
        <div>
            <img src="./first_loading.gif" alt="">
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import "~common/stylus/variable.less";
@import "~common/stylus/mixin.less";
.first-loading{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #fff;
    z-index: 100;
    img{
        width: 200px;
        height: 200px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -100px;
        margin-top: -100px;
    }
}



</style>
