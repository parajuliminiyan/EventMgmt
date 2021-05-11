import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Text, Spinner } from 'native-base';
import {View} from 'react-native';
import Home from './screens/home';
import Login from './screens/login';
import SignUp from './screens/signup';
import Profile from "./screens/Profile";
import Employeer from './screens/employeer';
import HomeDrawer from './screens/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createStackNavigator();
export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
    <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Home" component={Home} initialParams={this.props.navigation}/>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Employeer" component={Employeer} />
      <Stack.Screen name="Drawer" component={HomeDrawer} />
    </Stack.Navigator>
   </NavigationContainer>
    )
  }
}