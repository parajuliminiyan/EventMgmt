import { Body, Button, Card, CardItem, Container, Icon, Content, Header, Left, Root, Text, Thumbnail, View } from 'native-base';
import React, { Component } from 'react';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {RefreshControl,ScrollView} from 'react-native';
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
export default class Home extends Component
{
    state = {
        name:'',
        email:'',
        phoneNo:'',
        location:'',
        id:'',
        tableHead: ['Days', 'Universitys', 'Shifts'],
        tableData: [],
        refreshing:false
      }
      async componentDidMount()
      {
        let userData = await AsyncStorage.getItem('userData');
        let data = JSON.parse(userData);
        this.setState({id:data.id,name:data.fullname,email:data.email,phoneNo:data.contactNo,location:data.address})
        console.log(this.state.id);
        fetch('http://10.0.2.2:8000/api/jobs/users',{    
            method:'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type':'application/json'
            },
            body: JSON.stringify({
                userid:this.state.id
            })
            }).then((response)=> response.json())
            .then( async(res)=>{
                console.log(res.data);
                this.setState({tableData:res.data})
            }).catch((err)=>console.log(err));
      }
      gotoProfile = async() => {
        this.props.navigation.navigate('Profile');
      }
      onRefresh(){
        this.setState({refreshing:true});
        wait(3000).then(async() => {
            fetch('http://10.0.2.2:8000/api/users',{    //10.0.2.2 for emulator and 127.0.0.1 for normal devices.
            method:'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type':'application/json'
            },
            body: JSON.stringify({
                userid:this.state.id
            })
          })
          .then((response)=> response.json())
          .then( async(res)=> {
              await AsyncStorage.setItem('userData', JSON.stringify(res.data));
              let data = res.data[0];
              console.log(data);
              this.setState({id:data.id,name:data.fullname,email:data.email,phoneNo:data.contactNo,location:data.address})
          }).catch((err)=>console.log(err));
          fetch('http://10.0.2.2:8000/api/jobs/users',{    
            method:'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type':'application/json'
            },
            body: JSON.stringify({
                userid:this.state.id
            })
            }).then((response)=> response.json())
            .then( async(res)=>{
                console.log('Fuck you!!')
                console.log(res.data);
                
                this.setState({tableData:res.data})
            }).catch((err)=>console.log(err));
            this.setState({refreshing:false});
        });
      }
    render() 
    {
        const Drawer = createDrawerNavigator();
        const data = [1, 2, 3, 4, 5];
        return(
            <Root>
                <Container>
                    <Header style={{backgroundColor:'#34495e'}} >
                        <Left>
                            <Button transparent small onPress={ () => this.props.navigation.openDrawer()}><Icon type="FontAwesome" name="bars" style={{color:'#fff'}} /></Button>
                        </Left>
                        <Body>
                            <Text style={{color:'#fff'}}>Employeee Home</Text>
                        </Body>     
                    </Header>
                    <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)} />}>
                    <Content>
                        <Card style={{alignItems:'center'}}>
                        <Thumbnail style={{alignSelf:'center', marginTop:20}} source={{uri:'https://www.pinclipart.com/picdir/middle/60-602450_profile-clipart-profile-icon-round-profile-pic-png.png'}} />
                            <CardItem>
                                <Text>{this.state.name}</Text>
                            </CardItem>
                            <CardItem>
                                <Text>{this.state.email}</Text>
                            </CardItem>
                            <CardItem>
                                <Text>{this.state.phoneNo}</Text>
                            </CardItem>
                            <CardItem>
                                <Text>{this.state.location}</Text>
                            </CardItem>
                            <CardItem>
                                <Button onPress={()=> this.gotoProfile()}><Text>Edit Profile</Text></Button>
                            </CardItem>
                        </Card>
                        <Text>Accepted Task</Text>
                        <View style={{flex:1,padding: 10, paddingTop: 7, backgroundColor: '#fff'}}>
                        {this.renderRow()}
                        </View>
                    </Content>
                    </ScrollView>
                </Container>
            </Root>
            
        );
    }

    renderRow()
    {
        let data = this.state.tableData;
        data.map((items)=>{
            console.log(items.workingHours, items.starttime, items.time);
        })
        if(data.length == 0)
        {
          return <View style={{margin:110,flex:1}}><Text>No any Tasks!!</Text></View>
        }else{
           return <View style={{flexDirection:'row'}}>
                {
                    data.map((items)=>{
                       return <Card style={{flex:1}} key={items.id}>
                            <CardItem style={{flexDirection:'column'}} >
                                <View style={{flexDirection:'row'}}><Text style={{marginRight:5}}>Task:</Text><Text>{items.title}</Text></View>
                                <View style={{flexDirection:'row'}}><Text style={{marginRight:5}}>Time Frame:</Text><Text><Text>{items.starttime} - {items.finishtime}</Text></Text></View>
                                <View style={{flexDirection:'row'}}><Text style={{marginRight:5}}>Working Days:</Text><Text><Text>{items.workingHours}</Text></Text></View>
                            </CardItem>
                        </Card>
                    })
                }
           </View>
        }
        // return <View><Text>Test</Text></View>
    }

}