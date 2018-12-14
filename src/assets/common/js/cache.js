import storage from 'good-storage'
const SEARCH_KEY = "_SEARCH_HISTORY_"
const MAX_HISTORYNUM = 20

function resetArray(array,val,maxnum){
    let n = array.findIndex(value => {return value===val});
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
    let newStorage = resetArray(searches,val,MAX_HISTORYNUM);
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