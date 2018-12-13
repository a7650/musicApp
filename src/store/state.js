import {playMode} from 'common/config'
import {getSearchHistory} from 'common/js/cache'
const state = {
    singer:{},
    playing:false,
    fullScreen:false,
    playList:[],
    sequenceList:[],
    playMode:playMode.sequence,
    currentIndex:-1,
    player:{},
    rankBar:false,
    searchHistory:getSearchHistory()
}

export default state