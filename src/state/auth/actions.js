import AsyncStorage from "@react-native-async-storage/async-storage";
import { Request } from "../../request";

import localization from '@serdarakkus/hyper/localization';

const generateActions = (store,getNavigator)=>{
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
        RequestVerification:async({email,phone},callback)=>{
            // const {data,error} = await Request.post("/auth/login",{email,phone});

            // if(error && typeof callback == 'function')
            //     return callback({error});

            // if(typeof callback == 'function')
            //     callback({data});

            // if(email)
            //     getNavigator().navigate('VerifyEmail',{email});

            // if(phone)
            //     getNavigator().navigate('VerifyNumber',{phone});

        },

    };
    return actions;
}
export {generateActions};