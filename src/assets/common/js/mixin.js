import {mapGetters,mapMutations,mapActions} from 'vuex'
export const adaptMiniPlay = {
    computed:{
        ...mapGetters([
            "playList"
        ])
    },
    watch:{
        playList(newList){
            this.adaptMiniPlay(newList)
        }
    },
    mounted(){
        this.adaptMiniPlay(this.playList)
    },
    activated(){
        this.adaptMiniPlay(this.playList)
    },
    methods:{
        adaptMiniPlay(){
            throw new Error("You need to define a 'adaptMiniPlay' function ")
        }
    }
}

