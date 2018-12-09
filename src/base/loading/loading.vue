<template>
    <div class="loading">
        <img src="./loading.gif"><br>
        <p>{{loadingText}}</p>
    </div>
</template>

<script>
export default {
    props:{
        loadingText:{
            type:String,
            default:"正在加载"
        }
    }
}
</script>
<style lang="less" scoped>
    .loading{
        width: 100%;
        text-align: center;
        img{
            width:30px;
            height: 30px;
        }
        p{
            color: #444;
        }
    }
</style>

