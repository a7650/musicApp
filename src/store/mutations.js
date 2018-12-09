import * as types from './mutation-types'

const mutations = {
    [types.SET_SINGER](state,singer){
        state.singer = singer;
    },

    [types.SET_PLAYING](state,flag){
        state.playing = flag;
    },

    [types.SET_FULLSCREEN](state,flag){
        state.fullScreen = flag;
    },

    [types.SET_PLAYLIST](state,list){
        state.playList = list;
    },

    [types.SET_SEQUENCELIST](state,list){
        state.sequenceList = list;
    },

    [types.SET_PLAYMODE](state,mode){
        state.playMode = mode;
    },

    [types.SET_CURRENTINDEX](state,index){
        state.currentIndex = index;
    },

    [types.DELETE_PLAYLIST](state,index){
        state.playList.splice(index,1);
        if(state.currentIndex>index){
            state.currentIndex--;
        }
        state.sequenceList = state.playList;
    },

    [types.DELETE_SEQUENCELIST](state,index){
        state.sequenceList.splice(index,1);
    },

    [types.SET_PLAYER](state,obj){
        state.player = obj;
    }

    



}


export default mutations