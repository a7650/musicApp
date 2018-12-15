import {playMode} from 'common/config'
import {getSearchHistory,getMyAlbum} from 'common/js/cache'
import {getFavoriteMid} from 'common/js/favorite'

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
    searchHistory:getSearchHistory(),
    myAlbum:getMyAlbum(),
    favoriteMid:getFavoriteMid()||[]
}

export default state