import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'


export function getRankList(){
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg';
    const data = Object.assign({},commonParams,{
        uin:0,
        forma:"json",
        platform:"h5",
        needNewCode:1,
        _:1543418506386
    });
    return jsonp(url,data,options).then( res => {
        return res.data;
    });
}