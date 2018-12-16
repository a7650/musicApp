import storage from 'good-storage'

const SEARCH_KEY = "_SEARCH_HISTORY_"
const MAX_HISTORYNUM = 20

const MYALBUM_KEY = "_MY_ALBUM_"
const COLLECTALBUM_KEY = "_COLLECT_ALBUM_"
const CREATEALBUM_KEY = "_CREATE_ALBUM_"
//search 
function resetArray(array,val,compare,maxnum){
    let n = array.findIndex(compare);
    if (n > -1){
        array.splice(n,1)
    }
    array.unshift(val);
    if(array.length>maxnum){
        array.pop();
    }
    return array;
}

export function saveSearchHistory(val){
    let searches = storage.get(SEARCH_KEY,[]);
    let newStorage = resetArray(searches,val,(value) => {return value===val},MAX_HISTORYNUM);
    storage.set(SEARCH_KEY,newStorage);
    return newStorage;
}
export function getSearchHistory(){
    return storage.get(SEARCH_KEY,[])
}

export function clearSearchHistory({flag,index}){
    if(flag){
        storage.set(SEARCH_KEY,[]);
        return [];
    }
    else{
        let searches = storage.get(SEARCH_KEY,[]);
        searches.splice(index,1);
        storage.set(SEARCH_KEY,searches);
        return searches;
    }
}



//my-album
export function getMyAlbum(){
    return storage.get(MYALBUM_KEY,[{name:"我的收藏",bgUrl:""}]);
}

export function getCreateAlbum(val){
   if(val){
    let album = storage.get(CREATEALBUM_KEY,[]);
    if(album.length === 0){
        storage.set(CREATEALBUM_KEY,[{name:"我的收藏",bgImg:'./default.png',desc:"这个歌单是由系统生成的默认收藏歌单",songList:[]}]);
        getCreateAlbum(val);

    }
    else{
         let n = album.findIndex(item=>item.name===val);
         return album[n];
    }
   }else{
        let album = storage.get(CREATEALBUM_KEY,[]);
        if(album.length === 0){
            storage.set(CREATEALBUM_KEY,[{name:"我的收藏",bgImg:'./default.png',desc:"这个歌单是由系统生成的默认收藏歌单",songList:[]}]);
            getCreateAlbum();
            return;
        }
        return album;
   }
}

export function setCreateAlbum(name,song){
    let album = getCreateAlbum(name);
    let n = album.songList.findIndex(item=>item.mid===song.mid);
    if(n>-1){
        return "这首歌已经在歌单了"
    }
    else{
        try{
            album.songList.unshift(song);
            album.bgUrl = song.image;
            let oldCreateAlbum = getCreateAlbum();
            let newCreateAlbum = resetArray(oldCreateAlbum,album,(item) => {return item.name===name},999);
            storage.set(CREATEALBUM_KEY,newCreateAlbum);
            let m_album = getMyAlbum();
            let x = m_album.findIndex(item=>item.name===name);
            m_album[x].bgUrl = song.image;
            storage.set(MYALBUM_KEY,m_album);

            return "添加成功"
        }catch(e){
            console.log(e);
            return "添加失败"
        }
    }
}

export function deleteFromAlbum(albumname,song){
    let album = getCreateAlbum(albumname);
    let n = album.songList.findIndex(item=>item.mid===song.mid);
    try{
        album.songList.splice(n,1);
        let oldCreateAlbum = storage.get(CREATEALBUM_KEY,[]);
        let newCreateAlbum = resetArray(oldCreateAlbum,album,(item) => {return item.name===albumname},999);
        storage.set(CREATEALBUM_KEY,newCreateAlbum);
        return {type:1,mes:"删除成功"}
    }catch(e){
        return {type:0,mes:"删除失败"}
    }
}

export function createAlbum(name,desc){
    let all = getMyAlbum();
    let n = all.findIndex(item => item.name===name);
    if(n>-1){
        return "该歌单已存在"
    }else{
        try{
            all.splice(1,0,{name,desc});
            storage.set(MYALBUM_KEY,all);
            let album = getCreateAlbum();
            album.splice(1,0,{name,desc,bgImg:"",songList:[]});
            console.log(album);
            storage.set(CREATEALBUM_KEY,album);
            return {type:1,mes:"创建成功"}
        }catch(e){
            return {type:0,mes:"创建失败"}
        }
        
    }
}


export function getCollectAlbum(){
    return storage.get(COLLECTALBUM_KEY,[]);
}

// {imgurl,creator.name,dissname,dissid}

export function setCollectAlbum(album){
    let allalbum = getCollectAlbum();
    let n = allalbum.findIndex(item=>item.dissid===album.dissid);
    if(n>-1){
        return {type:0,mes:"你已经收藏过这个歌单了"}
    }else{
        try{
            allalbum.unshift(album)
            storage.set(COLLECTALBUM_KEY,allalbum);
            return {type:1,mes:"收藏成功"}
        }catch(e){
            return {type:0,mes:"收藏失败"}
        }
    }
}

export function deleteCollectAlbum(album){
    let allalbum = getCollectAlbum();
    let n = allalbum.findIndex(item=>item.dissid===album.dissid);
    try{
        allalbum.splice(n,1)
        storage.set(COLLECTALBUM_KEY,allalbum);
        return {type:1,mes:"已取消收藏<br>你还可以再听一下"}
    }catch(e){
        return {type:0,mes:"出现错误，请重试，或者刷新页面"}
    }
}

export function isCollect(album){
    let allalbum = getCollectAlbum();
    let n = allalbum.findIndex(item=>item.dissid===album.dissid);
    return n > -1;
}

