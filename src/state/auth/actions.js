import AsyncStorage from "@react-native-async-storage/async-storage";
import { Request } from "../../request";

import localization from '@serdarakkus/hyper/localization';

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
            const { data, error } = await Request.post("/auth/signup", { email, password });

            const is_callable = typeof callback === "function";

            if (error && is_callable)
                return callback({ error });

            if (data && is_callable)
                return callback({ data });
        },
        RequestVerify: async ({ email, code }, callback) => {
            const { data, error } = await Request.post("/auth/verify", { email, code });

            const is_callable = typeof callback === "function";

            if (error && is_callable)
                return callback({ error });
            if (data && is_callable){
                callback({ data });
                store.dispatch({type: "USER_VERIFIED", payload: {user: data.user, access_token: data.access_token }});
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
            store.dispatch({type:"AUTH_RESTORE",payload:data});
            return callback({data:true});
        },

    };
    return actions;
}
export { generateActions };