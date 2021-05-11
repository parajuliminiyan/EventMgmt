import { Body, Button, Card, CardItem, Container, Icon, Content, Header, Left, Root, Text, Thumbnail, View } from 'native-base';
import React, { Component } from 'react';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {RefreshControl,ScrollView,Alert} from 'react-native';
export default class Logout extends Component {
    async doLogout()
    {
        // await AsyncStorage.clear();
        Alert.alert(
            'Logout',
            'Are you Sure you want to logout??',
            [
              {
                text: 'No',
                onPress: () => this.props.navigation.navigate('Drawer'),
                style: 'cancel',
              },
              {text: 'Yes', onPress: async() => { await AsyncStorage.clear(); this.props.navigation.navigate('Login');}},
            ],
            {cancelable: false},
          );
        // this.props.navigation.navigate('Login');
    }
    render()
    {
        return(
            <Root>
            <Container>
                <Header>
                    <Left>
                        <Button transparent small onPress={ () => this.props.navigation.openDrawer()}><Icon type="FontAwesome" name="bars" style={{color:'#fff'}} /></Button>
                    </Left>
                    <Body>
                        <Text style={{color:'#fff'}}>Home Page</Text>
                    </Body>     
                </Header>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <Button danger rounded  style={{alignSelf:'center', marginTop:300, padding:30}}  onPress={()=>this.doLogout()}><Text>Logout</Text></Button>
                </View>
                </Container>
                </Root>
        )
    }
}