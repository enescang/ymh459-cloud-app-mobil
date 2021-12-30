import AsyncStorage from "@react-native-async-storage/async-storage";
import { Request } from "../../request";

import localization from '@serdarakkus/hyper/localization';
import { LANGUAGES } from "../../config/languages";
import axios from "axios";
import { RSA } from "react-native-rsa-native";

const generateActions = (store, getNavigator) => {
    const actions =
    {
        GetLanguage: async ({ lng_key }) => {
            const available_languages = ["en", "tr", "ru"];
            const local = new localization();
            let lng = "en";
            if(available_languages.indexOf(lng_key) > -1){
                lng = lng_key;   
            }
            console.log("Fix Langugages!", {lng});
            local.set('en')(LANGUAGES.en);
            local.set('tr')(LANGUAGES.tr);
            local.set('ru')(LANGUAGES.ru);
            const translater = local.translate(lng);
            store.dispatch({ type: "LANGUAGE", payload: {translater, language: lng} });
            // GlobalEvents.fire("LANGUAGE_CHANGED");
            await AsyncStorage.setItem("selectedLanguage", lng);
        },
        RequestLogin: async ({ email, password }, callback) => {
            const { data, error } = await Request.post("/auth/login", { email, password });

            const is_callable = typeof callback === "function";

            if (error && is_callable)
                return callback({ error });
            if (data && is_callable)
                return callback({ data });
        },
        RequestSignup: async ({ email, password }, callback) => {
            const keys = await RSA.generateKeys(1024);
            const { data, error } = await Request.post("/auth/signup", { email, password, public_key: keys.public });

            const is_callable = typeof callback === "function";

            if (error && is_callable)
                return callback({ error });

            if (data && is_callable){
                getNavigator().navigate("Keys");
                store.dispatch({type: "SET_KEYS", payload: keys });
                console.log("KEYS", {keys});
                await actions.Serialize();
                return callback({ data: {data, keys} });
            }
        },
        RequestVerify: async ({ email, code }, callback) => {
            const { data, error } = await Request.post("/auth/verify", { email, code });

            const is_callable = typeof callback === "function";

            if (error && is_callable)
                return callback({ error });
            if (data && is_callable){
                callback({ data });
                Request.access_token = data.access_token;
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token;

                store.dispatch({type: "USER_VERIFIED", payload: {user: data.user, access_token: data.access_token}});
                store.dispatch({type: "COMPLETE_LOGIN", payload: true });
                actions.Serialize();
            }
        },
        Logout: async()=>{
            store.dispatch({type:'LOGOUT'});
            actions.Serialize();
        },
        Serialize:async(callback)=>{
            const data =  JSON.stringify(store.getState().auth);
            await AsyncStorage.setItem("auth",data);
            if(typeof callback=="function")
                callback({data:true});
        },
        Restore:async(callback)=>{
            let data = await AsyncStorage.getItem("auth");
            if(!data && typeof callback=="function")
                return callback({data:true});
            data = JSON.parse(data);
            Request.access_token = data.profile_token;
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token;
            store.dispatch({type:"AUTH_RESTORE",payload:data});
            return callback({data:true});
        },
        UpdateOrAddFile:async({ uri, size, mime, name, _id, is_uploaded, encrypted_aes_key, file_iv}, callback)=>{
            try{
                const file = {uri, size, mime, name, _id, is_uploaded, encrypted_aes_key, file_iv};
                const all_files = [...store.getState().auth.files];
                const id_map = all_files.map((f)=>f._id);
                const file_index = id_map.indexOf(_id);

                if(file_index >= 0){
                  all_files[file_index] = file;
                }else{
                    all_files.push(file);
                }

                console.log({all_files}, ">><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
                store.dispatch({type:"FILE_UPDATED",payload:{files:all_files}});
                callback({data:true});
                actions.Serialize();
            } catch(error){
                callback({error});
            }
        },
        RemoveFile: async({_id}, callback)=>{
            try{
                const all_files = [...store.getState().auth.files];
                const id_map = all_files.map((f)=>f._id);
                const file_index = id_map.indexOf(_id);
                if(file_index != -1){
                    all_files.splice(file_index, 1);
                }
                store.dispatch({type:"FILE_UPDATED",payload:{files:all_files}});
                callback({data:true});
                actions.Serialize();
            } catch(error){
                callback({data:false});
            }
            
        },
        LoadInfo: async()=>{
            const {data, error} = await Request.get("/user/info");
            store.dispatch({type:"INFO_UPDATED",payload:data});
        },
    };
    return actions;
}
export { generateActions };