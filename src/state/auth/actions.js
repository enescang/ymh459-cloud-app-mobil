import AsyncStorage from "@react-native-async-storage/async-storage";
import { Request } from "../../request";

import localization from '@serdarakkus/hyper/localization';
import axios from "axios";
import { RSA } from "react-native-rsa-native";

const generateActions = (store, getNavigator) => {
    const actions =
    {
        GetLanguage: async ({ val }) => {
            // local = new localization();

            // console.log("Fix Langugages!", {val});
            // local.set('en')(LAN.en);
            // local.set('tr')(LAN.tr);
            // const translater = local.translate(val);
            // store.dispatch({ type: "LANGUAGE", payload: {translater, language: val} });
            // GlobalEvents.fire("LANGUAGE_CHANGED");
            // await AsyncStorage.setItem("selectedLanguage", val);
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
            const keys = await RSA.generateKeys(4096);
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
        UpdateOrAddFile:async({ uri, size, mime, name, _id, is_uploaded}, callback)=>{
            try{
                const file = {uri, size, mime, name, _id, is_uploaded};
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