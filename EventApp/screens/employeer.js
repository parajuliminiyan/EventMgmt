import { Body, Button, Card, CardItem, Container, Content, Header, Icon, Label, Left, Root, Spinner, Toast, Text, Thumbnail, View } from 'native-base';
import React, { Component } from 'react';
import {RefreshControl} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView,Alert } from 'react-native';
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
export default class Employeer extends Component
{
    state = {
        id:'',
        name:'',
        email:'',
        affiliation:'',
        website: '',
        phoneno:'',
        address: '',
        jobs:[],
        refreshing:false
      }
      gotoProfile = async() => {
        this.props.navigation.navigate('Profile');
      }
      async componentDidMount()
      {
        this.forceUpdate();
        let userData = await AsyncStorage.getItem('userData');
        let data = JSON.parse(userData);
        this.setState({id:data.id,name:data.fullname,email:data.email,affiliation:data.affiliation,website:data.website,phoneno:data.phoneNumber,address:data.address});
        let id = this.state.id;
        fetch('http://10.0.2.2:8000/api/jobs',{    
         method:'POST',
         headers: {
           Accept: 'application/json',
           'Content-Type':'application/json'
         },
         body: JSON.stringify({
           id:this.state.name
         })
       }).then((response)=> response.json())
       .then( async(res)=>{
           
           this.setState({jobs:res.data})
       }).catch((err)=>console.log(err));
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
                id:this.state.id
            })
          })
          .then((response)=> response.json())
          .then( async(res)=> {
              await AsyncStorage.setItem('userData', JSON.stringify(res.data));
              let data = res.data[0];
              console.log(data);
              this.setState({id:data.id,name:data.fullname,email:data.email,affiliation:data.affiliation,website:data.website,phoneno:data.phoneNumber,address:data.address});
          }).catch((err)=>console.log(err));
          
          fetch('http://10.0.2.2:8000/api/jobs',{    
            method:'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type':'application/json'
            },
            body: JSON.stringify({
            id:this.state.name
            })
            }).then((response)=> response.json())
            .then( async(res)=>{
                console.log(res.data);
                this.setState({jobs:res.data})
            }).catch((err)=>console.log(err));
        this.setState({refreshing:false});
        });
      }
      async deleteJob(jobid) 
      {
          Alert.alert(
              'Dele Job',
              'Are you sure you want to delete??',
              [
                {
                  text: 'No',
                  onPress: () => this.props.navigation.navigate('Drawer'),
                  style: 'cancel',
                },
                {text: 'Yes', onPress: () => {
                    this.setState({refreshing:true});
                  fetch('http://10.0.2.2:8000/api/jobs/delete',{    
                      method:'POST',
                      headers: {
                      Accept: 'application/json',
                      'Content-Type':'application/json'
                      },
                      body: JSON.stringify({
                          id:jobid
                      })
                      }).then((response)=> response.json())
                      .then((res)=>{
                          Toast.show({
                              text: res.message,
                              buttonText: 'Okay',
                              duration:3000,
                              textStyle: {fontSize:17},
                              type:"danger"
                            });
                          this.onRefresh();
                      }).catch((err)=>console.log(err));
                  }},
              ],
              {cancelable: false},
            );
  
  
      }
    render() 
    {
        // const Drawer = createDrawerNavigator();
        const data = [1, 2, 3, 4, 5];
        return(
            <Root>
                <Container>
                    <Header style={{backgroundColor:'#2d3436'}}>
                        <Left>
                            <Button transparent small onPress={ () => this.props.navigation.openDrawer()}><Icon type="FontAwesome" name="bars" style={{color:'#fff'}} /></Button>
                        </Left>
                        <Body>
                            <Text style={{color:'#fff'}}>Employeer Home</Text>
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
                                <Text>{this.state.address ? this.state.address : '-' }</Text>
                            </CardItem>
                            <CardItem>
                                <Text>{this.state.phoneno? this.state.phoneno : '-'}</Text>
                            </CardItem>
                            <CardItem>
                                <Text>{this.state.email? this.state.email : ''}</Text>
                            </CardItem>
                            <CardItem>
                                <Button onPress={()=> this.gotoProfile()}><Text>Edit Profile</Text></Button>
                            </CardItem>
                        </Card>
                        <Text>Jobs Lists</Text>
                        {this.state.refreshing? <Spinner /> : this.renderJobList()}
                        
                    </Content>
                    </ScrollView>
                </Container>
            </Root>
            
        );
    }

    renderJobList(){
        console.log(this.state.jobs.length);
        if(this.state.jobs.length == 0)
        {
            return <Text>No any Jobs Posted!!</Text>
        }
        return this.state.jobs.map((item)=> {
            return <Card key={item.id} style={{marginBottom:10}}>
                <CardItem style={{ justifyContent:'space-between'}} >
                       <View style={{flex:1}}>
                            <Label style={{fontWeight:'bold'}}>Title</Label>
                            <Text >{item.title}</Text>
                            <Label style={{fontWeight:'bold'}}>workingHours</Label>
                            <Text>{item.workingHours}</Text>
                            <Label style={{fontWeight:'bold'}}>Start Date</Label>
                            <Text>{item.startdate}</Text>
                            <Label style={{fontWeight:'bold'}}>Working Days</Label>
                            <Text>{item.workingdays}</Text>
                       </View>
                        <View>
                            <Button bordered onPress={()=>this.deleteJob(item.id)} ><Icon  type="FontAwesome" name="trash" /></Button>
                        </View>
                </CardItem>
                
            </Card>
        })
    }
    // renderRow(data) {
    //     console.log(data);
    //     return (
    //         <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }} key={data}>
    //             <View style={{ flex: 1, alignSelf: 'stretch' }}  key={data}><Text>{data}</Text></View> 
    //         </View>
    //     );
    // }
}