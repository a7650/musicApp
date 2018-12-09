<template>
    <div class="recommend" ref="recommend">
        <div class="search">
            <input type="text" v-model="searchText" placeholder="搜索">
        </div>
        <div v-if="recommends.length" class="slider-wrapper">
            <div class="slider-content" ref="aaa" >
                <slider :recommends="recommends"   @sliderHeight="_sliderHeight">
                </slider>
            </div>
        </div>
        <div class="scroll-area">
        <scroll :data="discList" class="recommend-content" ref="recommendContent" :style="recommendStyle">
            <div class="recommend-songs">
                <h5 v-if="discList.length">热门歌单推荐</h5>
                <ul class="disc-list">
                    <li v-for="item in discList" :key="item.listnum" @click="selectDisc(item)" >
                        <div class="disc-icon"><img v-lazy="item.imgurl" alt=""></div>
                        <div class="disc-text">
                            <span class="title">{{item.creator.name | _discTitle}}</span>
                            <div class="text">{{item.dissname}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </scroll>
        </div>
        <div class="loading-container" v-if="!discList.length"><loading></loading></div>
        <router-view></router-view>
    </div>
</template>

<script>
import slider from 'base/slider/slider'
import radio from 'components/radioList'
import {getDiscList,getRadioList} from 'api/recommend'
import scroll from 'base/scroll/scroll'
import loading from 'base/loading/loading'
import {adaptMiniPlay} from 'common/js/mixin'
import {mapMutations} from 'vuex'

export default {
    mixins:[adaptMiniPlay],
    data(){
        return{
            radioLists:[],
            recommends:[],
            discList:[],
            currentDot:-1,
            searchText:"",
            sliderHeight:0
        }
    },
    computed:{
        recommendStyle(){
            return {
                "top" : `${this.sliderHeight}px`
            }
        }
    },
    components:{
        slider,
        radio,
        scroll,
        loading
    },
    methods:{
        adaptMiniPlay(playList){
            let bottom = playList.length>0 ? "15%" : 0;
            this.$refs.recommendContent.$el.style.bottom = bottom;
            this.$refs.recommendContent.refresh();
        },
        _sliderHeight(x){
            this.sliderHeight = x;
        },
        _getRadioList(){
                getRadioList().then(data => {
                    this.radioLists = data.radioList;
                    this.recommends = data.slider;
                }, err => {
                    console.log(err);
                })
        },
        _getDiscList(){
                getDiscList().then((res) => {
                    this.discList = res;
                    console.log(this.discList);
                },(err) => {
                    console.log(err);
                })
        },
        selectDisc(item){
            this.$router.push({
                name:"discDetail",
                params:{
                    id:item.dissid
                }
            });
            this.SET_SINGER(item);
        },
        ...mapMutations([
            "SET_SINGER"
        ])
    },
    filters:{
        _discTitle(val){
            return  val.replace(/QQ|qq|腾讯/,"");
        }
    },
    created(){
        this._getRadioList();
        this._getDiscList();
    },
    mounted(){
       
    }
}
</script>
<style lang="less" scoped>
@import "~common/stylus/variable.less";

.recommend{
    position:fixed;
    width: 100%;
    top:44px;
    bottom:0;//设置 fixed top bottom 使该元素获得固定的高度
    .tip{
        width: 100%;
        text-align: center;
        padding-top: 5px;
        color: @color-text-d;
        position: absolute;
        top:44px;
        z-index: -999;
    }
    .search{
        padding:8px ; 
        input{
            width: 100%;
            height: 27px;
            background: @color-highlight-background;
            color:gray;
            border-radius: 3px;
            color: @color-text-d;
            text-align: center;
        } 
    }
    .scroll-area{
        position: fixed;
        top: 87px;
        bottom: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
    }
    .recommend-content{
        position: absolute;//为了使该元素高度固定，则子元素的高度会大于该元素，就可以用scroll
        bottom: 0;
        width: 100%;
    }
    .slider-content{
        width: 100%;
    }
    .loading-container{
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
    } 
    .recommend-songs{
        text-align: center;
        background: @color-background;
        h5{
            padding: 10px 0;
            color: @color-theme;
        }
        .disc-list{
            li{
                padding:0 10px 0 20px;
                width:100%;
                display:flex;
                height:60px;
                margin-bottom:30px;
                box-sizing:border-box;
                .disc-icon{
                    img{
                        width:60px;
                        flex-basis:60px;
                    }
                }
                .disc-text{
                    box-sizing:border-box;
                    padding:5px 0;
                    padding-left:20px;
                    flex:1;
                    display:flex;
                    flex-direction:column;
                    justify-content:space-between;
                    align-items:flex-start;
                    .text{
                        color:rgba(255, 255, 255, 0.5);
                         text-overflow: ellipsis;
                         overflow: hidden;
                         white-space: nowrap;
                    }
                }
            }
        }
    }
}

</style>



