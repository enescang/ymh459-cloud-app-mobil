import RNFetchBlob from "rn-fetch-blob";
import {Platform} from "react-native";
import mime from "mime";

export const file_exists = async(path)=>{
    if(!path)
        return false;
    try{
        const exists = await RNFetchBlob.fs.exists(path)
        return exists;
    }catch(e){
        console.log("FS",e);
        return false;
    }
}

export const dir_exists = async(path)=>{
    if(!path)
        return false;
    try{
        const exists = await file_exists(path);
        if(!exists)
            return false;
        const is_dir = await RNFetchBlob.fs.isDir(path);
        return is_dir;
    }catch(e){
        console.log("FS",e);
        return false;
    }
}

export const create_dir = async(path)=>{
    if(!path)
        return false;
    if(await dir_exists(path))
        return true;
    try{
        await RNFetchBlob.fs.mkdir(path);
        return await dir_exists(path);
    }catch(e){
        console.log("FS",e);
        return false;
    }
}

export const copy_file = async(from,to)=>{
    if(!from || !to)
    {
        console.log("FS","Copy File needs both parameters");
        return false;
    }
    if(!await file_exists(from))
    {
        console.log("FS","File Does not exists");
        return false;
    }
    let target_dir = to.split("/");
    target_dir.splice(target_dir.length-1,1);
    target_dir = target_dir.join("/");
    if(!await dir_exists(target_dir))
        await create_dir(target_dir);
    
    try{
        await RNFetchBlob.fs.cp(from,to);
        return await file_exists(to);
    }catch(e){
        console.log("FS",e);
        return false;
    }
}

export const get_dir_for_meme_type = (type)=>{
    let media_type = type.split("/")[0];
    if(!media_type)
        media_type = "document";
    return RNFetchBlob.fs.dirs.SDCardDir+"/YMH459/"+ media_type+"/";
}


export const download_file_to_cache = async(uri,auth)=>{
    const headers = {};
    if(auth)
        headers["Authorization"] = `Bearer ${auth}`;
    return new Promise((async resolve=>{
        RNFetchBlob
        .config({
          fileCache : true,
        })
        .fetch('GET',uri,headers)
        .then((res) => {
            if(res.respInfo.status != 200)
            {
                return resolve({error:res.respInfo.status});
            }
            resolve({data:res.path()});
        }).catch(error=>resolve({error}));
    }))
}

export const read_file_as_ascii = async(path)=>{
    return new Promise((async resolve=>{
        RNFetchBlob.fs.readStream(path, "base64")
        .catch((err)=>{
            console.log("FS",err);
            resolve(null);
        })
        .then((stream) => {
            console.log(stream)
            let data = ''
            stream.open()
            stream.onData((chunk) => {
                data += chunk
            })
            stream.onEnd(() => {
                resolve(data);
            })
        })
    }))
}

export const base64_to_file = async(data, mime)=>{
    const extension = get_extension_from_mime(mime)
    const save_path = `${RNFetchBlob.fs.dirs.CacheDir}/${Math.random().toString()}.${extension}`
    let result = Platform.select({
        android: "file://",
        ios: ""
    });
    result += await RNFetchBlob.fs.createFile(save_path, data, "base64");
    return result;
}

export const get_cache_directory = ()=>{
    return RNFetchBlob.fs.dirs.CacheDir;
}

export const get_extension_from_mime = (type)=>{
    return mime.getExtension(type);
}

export const get_cache_path_for_file_type = (type)=>{
    return get_cache_directory() + Math.random().toString(32) +"."+ get_extension_from_mime(type);
}