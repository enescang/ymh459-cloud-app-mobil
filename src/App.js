import React, { Component } from 'react'
import { Text, View } from 'react-native'

import Navigation from './navigation'
import { actions, store } from "./state";
import { Provider } from "react-redux";
import {Request} from './request';

Request.baseURL = "http://192.168.1.105:4000";

export default class App extends Component {

  componentDidMount(){
    actions.auth.Restore(()=>{

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
