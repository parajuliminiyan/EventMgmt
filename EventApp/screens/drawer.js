import * as React from 'react';
import { Button, View,Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './home';
import Profile from './Profile';
import Jobs from './jobs';
import Tasks from './tasks';
import Employeer from './employeer';
import Notifications from './notifications';
import EProfile from './eProfile';
import Logout from './logout';
import AsyncStorage from '@react-native-async-storage/async-storage';
function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>This is Tasks</Text>
      </View>
    );
  }

  function NotificationsScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>This is Notifications</Text>
      </View>
    );
  }

const Drawer = createDrawerNavigator();

    export default function HomeDrawer({route}) {
      const data = route.params;
      let routeName = '';
      data.userData == 0 ? routeName = 'Home' : routeName='Employeer'
      return (
          <Drawer.Navigator initialRouteName={routeName}>
            {routeName == 'Home' ? <Drawer.Screen name="Home" component={Home} />  : 
            <Drawer.Screen name="Employeer" component={Employeer} /> }
            {routeName == 'Employeer' ?
            <Drawer.Screen name="Profile" component={EProfile} /> : 
            <Drawer.Screen name="Profile" component={Profile} /> }
            {routeName == 'Home' ? <Drawer.Screen name="Calender" component={Tasks} /> : null }
            {routeName == 'Home' ? <Drawer.Screen name="Notifications" component={Notifications} /> : null}
            {routeName == 'Employeer' ? <Drawer.Screen name="Create Jobs" component={Jobs}/> : null }
            <Drawer.Screen name="Logout" component={Logout} />
          </Drawer.Navigator>
      );
    }