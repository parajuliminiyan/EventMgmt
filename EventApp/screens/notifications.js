import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RefreshControl,ScrollView} from 'react-native';
import { Body, Button, Card, CardItem, Container, Content, Header, Icon, Left, List, ListItem, Root, Spinner, Text, Thumbnail, View } from 'native-base';
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
export default class Notifications extends Component
{
    state = {
        loading: false,
        data: [],
        page: 1,
        seed: 1,
        error: null,
        id:'',
        notid:'',
        refreshing:false
      };
     async componentDidMount()
      {
        let userData = await AsyncStorage.getItem('userData');
        let data = JSON.parse(userData);
        data.id == undefined ? this.setState({id:data[0].id}) : this.setState({id:data.id});
        const { page, seed } = this.state;
        const url = `http://10.0.2.2:8000/api/notifications`
        this.setState({ loading: true });
        fetch('http://10.0.2.2:8000/api/notifications',{
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
          .then( async (res)=> {
          if(res.status == 'Error')
          {
              Toast.show({
                  text: res.message,
                  buttonText: 'Okay',
                  duration:3000,
                  textStyle: {fontSize:17},
                  type:"danger"
                });
                return;
          }
          this.setState({loading:false, data:res.data});
          console.log(res.data)
      })
      .catch(err => console.log(err));
      }
      acceptoffer = async(id) => {
        // alert('Thank you for accepting the offer');
        console.log(this.state.id);
        fetch('http://10.0.2.2:8000/api/notifications/create',{
          method:'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type':'application/json'
          },
            body: JSON.stringify({
                state:1,
                userid:this.state.id,
                id:id
            })
          })
          .then((response)=> response.json())
          .then( async (res)=> {
            fetch('http://10.0.2.2:8000/api/notifications',{
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
              .then( async (res)=> {
              if(res.status == 'Error')
              {
                  Toast.show({
                      text: res.message,
                      buttonText: 'Okay',
                      duration:3000,
                      textStyle: {fontSize:17},
                      type:"danger"
                    });
                    return;
              }
              this.setState({loading:false, data:res.data});
              console.log(res.data)
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
      }
      rejectoffer = async (id) => {
        // alert('Thank you for confirming!!');
        fetch('http://10.0.2.2:8000/api/notifications/create',{
          method:'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type':'application/json'
          },
            body: JSON.stringify({
                state:0,
                userid:this.state.id,
                id:id
            })
          })
          .then((response)=> response.json())
          .then( async (res)=> {
            fetch('http://10.0.2.2:8000/api/notifications',{
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
              .then( async (res)=> {
              if(res.status == 'Error')
              {
                  Toast.show({
                      text: res.message,
                      buttonText: 'Okay',
                      duration:3000,
                      textStyle: {fontSize:17},
                      type:"danger"
                    });
                    return;
              }
              this.setState({loading:false, data:res.data});
              console.log(res.data)
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
      }
      onRefresh(){
        this.setState({refreshing:true});
        wait(3000).then(() =>  {
          fetch('http://10.0.2.2:8000/api/notifications',{
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
          .then( async (res)=> {
          if(res.status == 'Error')
          {
              Toast.show({
                  text: res.message,
                  buttonText: 'Okay',
                  duration:3000,
                  textStyle: {fontSize:17},
                  type:"danger"
                });
                return;
          }
          this.setState({loading:false, data:res.data});
          console.log(res.data)
      })
      .catch(err => console.log(err));
          this.setState({refreshing:false})

        });
      }
    render()
    {
        return(
            <Root>
                <Container>
                    <Content>
                        <Header>
                            <Left>
                                <Button transparent small onPress={ () => this.props.navigation.openDrawer()}><Icon type="FontAwesome" name="bars" style={{color:'#fff'}} /></Button>
                            </Left>
                            <Body>
                                <Text style={{color:'#fff'}}>Notifications</Text>
                            </Body>
                        </Header>
                        <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)} />}>
                        {this.state.loading ? <Spinner /> : this.renderlist()}
                        </ScrollView>
                    </Content>
                </Container>
            </Root>
        )
    }
    renderlist()
    {
        let data = this.state.data;
        if(data.length == 0)
        {
          return <View style={{margin:110,flex:1}}><Text>No any Notifications!!</Text></View>
        }
        
        return data.map((items)=>{
            return <Card key={items.id}>
                <CardItem>
                    <Body>
                        <Text style={{padding:5, fontWeight:'bold'}}>Job Offer</Text>
                        <Text style={{padding:5}}>
                         {items.title}
                        </Text>
                        <Text style={{padding:5}}>Offered by: {items.postedby}</Text>
                        <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                            <Button rounded success style={{margin:5}} onPress={()=> this.acceptoffer(items.id)}><Text>Accept</Text></Button>
                            <Button rounded danger style={{margin:5}} onPress={()=>this.rejectoffer(items.id)}><Text>Reject</Text></Button>
                        </View>
                    </Body> 
                </CardItem>
            </Card>
          })
            
            
    }
         
}