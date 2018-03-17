export function getRegisterPath({type,avatar}){
    let url=(type==='boss')?'/boss':'/genius';
    if(!avatar){
        url+='info'
    }
    return url;
}