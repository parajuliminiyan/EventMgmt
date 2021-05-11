import { Body, Button,
     Card,
      CardItem,
       Container,
        Content, 
        Header, 
        Root, 
        Text, 
        Thumbnail, 
        View,
        Item as FormItem,
        Form,
        Label,
        Input,
        Toast,
        Left,
        Icon
 } from 'native-base';
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native';
import bcrypt from 'react-native-bcrypt';
export default  class Profile extends Component
{
    state = {
        name:'',
        id:'',
        email:'',
        age:'',
        sex:'',
        contactNo:0,
        qualifications:'',
        experience:'',
        currentPassword:'',
        dbPassword: '',
        newPassword:'',
        confirmPassword:'',
        address:''
    }
    
    async componentDidMount()
    {
      let userData = await AsyncStorage.getItem('userData');
      let data = JSON.parse(userData);
      this.setState({id:data.id,name:data.fullname,email:data.email,contactNo:data.contactNo,age:data.age,sex:data.sex,dbPassword:data.password});
      
        console.log(this.state.name);
    }

     changePassword = async () => {
        let currentPassword = this.state.confirmPassword;
        let newPassword = this.state.newPassword;
        let confirmPassword = this.state.confirmPassword;
        if(currentPassword=='' || newPassword == '' || confirmPassword == '')
        {
            Toast.show({
                text: 'Fields Empty',
                buttonText: 'Okay',
                duration:3000,
                textStyle: {fontSize:17},
                type:"danger"
              });
            return;
        }
        if(newPassword != confirmPassword)
        {
            Toast.show({
                text: 'New Password and Confirm Password didnot match',
                buttonText: 'Okay',
                duration:3000,
                textStyle: {fontSize:17},
                type:"danger"
              });
            return;
        }
        let validPass = await bcrypt.compareSync(this.state.currentPassword,this.state.dbPassword);
        if(!validPass)
        {
            Toast.show({
                text: 'Current Password Didnot match',
                buttonText: 'Okay',
                duration:3000,
                textStyle: {fontSize:17},
                type:"danger"
              });
            return;
        }
        let url = `http://10.0.2.2:8000/api/profile/${this.state.id}/edit`;  //10.0.2.2 for emulator and 127.0.0.1 for normal devices.
        fetch(url,{    
          method:'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
            password:this.state.newPassword
          })
        })
        .then((response)=> response.json())
        .then( async(res)=> {
          if(res.status == 'Error')
          {
            // alert(res.message);
            Toast.show({
              text: res.message,
              buttonText: 'Okay',
              duration:3000,
              textStyle: {fontSize:17},
              type:"danger"
            });
          }else{
            Toast.show({
                text: res.message,
                buttonText: 'Okay',
                duration:3000,
                textStyle: {fontSize:17},
                type:"success"
              });
            this.props.navigation.navigate('Drawer');
          }
        }).catch((err)=>console.log(err));
    }

    editProfile = async () => {
    let url = `http://10.0.2.2:8000/api/profile/${this.state.id}/edit`;  //10.0.2.2 for emulator and 127.0.0.1 for normal devices.
    console.log(url);
        let fullname= this.state.name;
        let email= this.state.email;
        let age=this.state.age;
        let sex=this.state.sex;
        let contactNo=this.state.contactNo;
        let qualification=this.state.qualifications;
        let experience=this.state.experience
        let address = this.state.address
        console.log(fullname,email,age,sex,contactNo,qualification,experience);
    fetch(url,{    
      method:'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        fullname: fullname,
        email: email,
        age:age,
        sex:sex,
        contactNo:contactNo,
        qualification:qualification,
        experience:experience,
        address:address
      })
    })
    .then((response)=> response.json())
    .then( async(res)=> {
      if(res.status == 'Error')
      {
        // alert(res.message);
        Toast.show({
          text: res.message,
          buttonText: 'Okay',
          duration:3000,
          textStyle: {fontSize:17},
          type:"danger"
        });
      }else{
        Toast.show({
            text: res.message,
            buttonText: 'Okay',
            duration:300,
            textStyle: {fontSize:17},
            type:"success"
          });
          let data = await AsyncStorage.setItem('userData',JSON.stringify(res.data))
          this.props.navigation.goBack();
      }
    }).catch((err)=>console.log(err));
        
    }

    render(){
        return(
            
                <Container>
                    <Content>
                        <Header>
                            <Left>
                                <Button transparent small onPress={ () => this.props.navigation.openDrawer()}><Icon type="FontAwesome" name="bars" style={{color:'#fff'}} /></Button>
                            </Left>
                            <Body>
                                <Text style={{color:'#fff'}}>Edit Profile</Text>
                            </Body>
                        </Header>
                        <ScrollView>
                        <Card style={{alignItems:'center'}}>
                        <Thumbnail style={{alignSelf:'center', marginTop:20}} source={{uri:'https://www.pinclipart.com/picdir/middle/60-602450_profile-clipart-profile-icon-round-profile-pic-png.png'}} />
                        <Text style={{alignSelf:'center', padding:20, fontSize:18, fontWeight:'bold'}}>Edit Profile</Text>
                        </Card>
                        <View style={{alignItems:'center', width:400, backgroundColor:'#2980b9'}}><Text style={{padding:10}}>Edit Profile</Text></View>
                        <Card>
                        <Form>
                            <CardItem>
                                    <FormItem floatingLabel>
                                        <Label>Full Name</Label>
                                        <Input value={this.state.name}  onChangeText={(text)=>this.setState({name:text})}/>
                                    </FormItem>
                            </CardItem>
                            <CardItem>
                                    <FormItem floatingLabel>
                                        <Label>Email</Label>
                                        <Input value={this.state.email} onChangeText={(text)=>this.setState({email:text})} />
                                    </FormItem>
                            </CardItem>        
                            <CardItem>
                                    <FormItem floatingLabel>
                                        <Label>ContactNo</Label>
                                        <Input value={this.state.contactNo} onChangeText={(text)=>this.setState({contactNo:text})} />
                                    </FormItem>
                            </CardItem>
                            <CardItem>
                                    <FormItem floatingLabel>
                                        <Label>Address</Label>
                                        <Input value={this.state.address} onChangeText={(text)=>this.setState({address:text})} />
                                    </FormItem>
                            </CardItem>
                            <CardItem style={{flex:1, flexDirection:'row-reverse'}}>
                                <Button rounded onPress={()=> this.editProfile()}><Text>Save</Text></Button>
                            </CardItem>
                            </Form>
                        </Card>
                        <View style={{alignItems:'center', width:400, backgroundColor:'#2980b9'}}><Text style={{padding:10}}>Change Password</Text></View>
                        <Card>
                        <Form>
                            <CardItem>
                                    <FormItem floatingLabel>
                                        <Label>Current Password</Label>
                                        <Input onChangeText={(text)=> this.setState({currentPassword:text})} secureTextEntry={true} />
                                    </FormItem>
                            </CardItem>
                            <CardItem>
                                    <FormItem floatingLabel>
                                        <Label>New Password</Label>
                                        <Input onChangeText={(text)=> this.setState({newPassword:text})} secureTextEntry={true} />
                                    </FormItem>
                            </CardItem>        
                            <CardItem>
                                    <FormItem floatingLabel>
                                        <Label>Confirm Password</Label>
                                        <Input onChangeText={(text)=> this.setState({confirmPassword:text})} secureTextEntry={true} />
                                    </FormItem>
                            </CardItem>
                            <CardItem style={{flex:1, flexDirection:'row-reverse'}}>
                                <Button rounded onPress={()=>this.changePassword()}><Text>Save</Text></Button>
                            </CardItem>
                            </Form>
                        </Card>
                        </ScrollView>
                    </Content>
                </Container>
            
        )
    }
}