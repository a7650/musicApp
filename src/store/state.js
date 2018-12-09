import {playMode} from 'common/config'

const state = {
    singer:{},
    playing:false,
    fullScreen:false,
    playList:[],
    sequenceList:[],
    playMode:playMode.sequence,
    currentIndex:-1,
    player:{}
}

export default state