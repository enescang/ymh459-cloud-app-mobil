import React, { Component } from 'react'
import { Text, View, NativeModules } from 'react-native'

import Navigation from './navigation'
import { actions, store } from "./state";
import { Provider } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Request} from './request';

Request.baseURL = "https://ymh459-cloud-app-api.herokuapp.com";

export default class App extends Component {

  state = {
    restored:false
  }
  componentDidMount(){
    actions.auth.Restore(async()=>{
      const deviveLanguage = NativeModules.I18nManager.localeIdentifier;
      if(deviveLanguage.split("_")[0]){
        const selectedLanguage = await AsyncStorage.getItem("selectedLanguage");
        actions.auth.GetLanguage({lng_key: selectedLanguage || deviveLanguage.split("_")[0]});
      }
      this.setState({restored:true});
    });
  }
  render() {
    if(this.state.restored == false){
      return <></>
    }
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    )
  }
}
