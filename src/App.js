import React, { Component } from 'react'
import { Text, View } from 'react-native'

import Navigation from './navigation'
import { actions, store } from "./state";
import { Provider } from "react-redux";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    )
  }
}
