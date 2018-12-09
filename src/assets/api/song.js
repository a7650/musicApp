import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'
import { promises } from 'fs';

export function _getLyric(mid){
    const url = 'http://106.12.198.147/music/api/getLyric';
    const data = Object.assign({},commonParams,{
        format:"json",
        pachetime:(new Date()).valueOf(),
        songmid:mid,
        loginUin:0,
        hostUin:0,
        notic:0,
        platform:'yqq',
        needNewCode:0
    });
    return axios.get(url,{
        params:data
    }).then(response => {
        let res = response.data;
        return Promise.resolve(res);
    })
}