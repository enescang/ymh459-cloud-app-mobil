import React, { Component } from 'react'
import { Text, View, NativeModules } from 'react-native'

import Navigation from './navigation'
import { actions, store } from "./state";
import { Provider } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Request} from './request';

Request.baseURL = "http://192.168.1.103:4000";

export default class App extends Component {

  componentDidMount(){
    actions.auth.Restore(async()=>{
      const deviveLanguage = NativeModules.I18nManager.localeIdentifier;
      if(deviveLanguage.split("_")[0]){
        const selectedLanguage = await AsyncStorage.getItem("selectedLanguage");
        actions.auth.GetLanguage({lng_key: selectedLanguage || deviveLanguage.split("_")[0]});
      }
    });
  }
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    )
  }
}
