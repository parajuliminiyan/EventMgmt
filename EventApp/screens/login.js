import React, { Component } from 'react';
import {
  Container,
  Header,
  Button,
  Text,
  Body,
  Form,
  Item as FormItem,
  Input,
  Label,
  Title,
  Root,
  Toast
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class Login extends Component{
     state = {
        email:'',
        password:'',
        message:''
      }
    

  performLogin = async() => {
    let email = this.state.email;
    let password = this.state.password;
    if(!email || !password)
    {
      alert('Please Enter Email and Password');
    }
    fetch('http://10.0.2.2:8000/api/login',{    //10.0.2.2 for emulator and 127.0.0.1 for normal devices.
      method:'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        email:email,
        password:password
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
        await AsyncStorage.setItem('userData', JSON.stringify(res.data));
        this.props.navigation.navigate('Drawer',{userData:res.data.type});
      }
    }).catch((err)=>console.log(err));
  }
    render()
    {
        return(
            <Root>
                <Container>
                    <Header>
                      <Body><Text style={{color:'#fff'}}>Login</Text></Body>
                    </Header>
                    <Form> 
                    <FormItem floatingLabel style={{marginBottom:10}}>
                        <Label>Email</Label>
                        <Input onChangeText={(text)=> this.setState({email:text})}
                            returnKeyType="next"
                            keyboardType="email-address"
                        />
                    </FormItem>
                    <FormItem floatingLabel last style={{marginBottom:20}}>
                        <Label>Password</Label>
                        <Input  onChangeText={(text)=> this.setState({password:text})}
                                secureTextEntry={true}
                                keyboardType="default"
                        />

                    </FormItem>

                    <Button block rounded primary style={{ padding:10, margin:10 }} onPress={()=>this.performLogin()}>
                        <Text> Login </Text>
                    </Button>
                    <Button block rounded  primary style={{padding: 10, margin:10}} onPress={() => this.props.navigation.navigate('SignUp')}><Text> Sign Up </Text></Button>
                    </Form>
                </Container>
            </Root>
        );
    }
}