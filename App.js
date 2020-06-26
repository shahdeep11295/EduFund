import React from "react";
import Routes from "./src/Screens/Routes";
import 'react-native-gesture-handler';
import { Provider } from "react-redux";
import Store from './src/utils/Store'
import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

export default class App extends React.Component {
  render() {
    return (
       <Provider store={Store}>
        <Routes />
       </Provider>
    );
  }
}