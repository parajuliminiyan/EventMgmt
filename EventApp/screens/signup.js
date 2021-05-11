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
  Toast,
  Picker,CheckBox, View
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import CheckBox from '@react-native-community/checkbox';
export default class SignUp extends Component
{
    state= {
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:'',
        checked:false,
        items: [{label: 'Apple', value: 'apple'},
        {label: 'Banana', value: 'banana'}]
    }
    handleCheckbox(id)
    {
        this.state.checked? this.setState({checked:false}): this.setState({checked:true});
    }
    performSignUp = () => {
        let firstName = this.state.firstName;
        let lastName = this.state.lastName;
        let email = this.state.email;
        let password = this.state.password;
        let confirmPassword = this.state.confirmPassword;
        console.log(firstName,lastName,email,password,confirmPassword);
        if(!firstName || !lastName || !email || !password || !confirmPassword)
        {
            Toast.show({
                text: 'Please Enter All the fields',
                buttonText: 'Okay',
                duration:3000,
                textStyle: {fontSize:17},
                type:"danger"
              });
              return;
        }
        if(password != confirmPassword)
        {
            Toast.show({
                text: 'Password Didnot Match',
                buttonText: 'Okay',
                duration:3000,
                textStyle: {fontSize:17},
                type:"danger"
              });
              return;
        }
        fetch('http://10.0.2.2:8000/api/signup',{ //10.0.2.2 for emulator and 127.0.0.1 for normal devices.
            method:'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                firstName:firstName,
                lastName:lastName,
                email:email,
                password:password,
                type: this.state.checked? 1: 0
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
            console.log(res.data.id);
            await AsyncStorage.setItem('userData', JSON.stringify(res.data));
            this.props.navigation.navigate('Drawer',{userData:res.data.type});
        })
        .catch(err => console.log(err));
        
    }

    render()
    {
        return(
            <Root>
                <Container>
                    <Header>
                    <Body>
                        <Title>SignUp</Title>
                    </Body>
                    </Header>
                    <Form> 
                    <FormItem floatingLabel style={{marginBottom:10}}>
                        <Label>First Name</Label>
                        <Input onChangeText={(text)=> this.setState({firstName:text})}
                            returnKeyType="next"
                            keyboardType="email-address"
                        />
                    </FormItem>
                    <FormItem floatingLabel style={{marginBottom:10}}>
                        <Label>Last Name</Label>
                        <Input onChangeText={(text)=> this.setState({lastName:text})}
                            returnKeyType="next"
                            keyboardType="email-address"
                        />
                    </FormItem>
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
                    
                    <FormItem floatingLabel last style={{marginBottom:20}}>
                        <Label>Confirm Password</Label>
                        <Input  onChangeText={(text)=> this.setState({confirmPassword:text})}
                                secureTextEntry={true}
                                keyboardType="default"
                        />

                    </FormItem>
                    <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                        <Label style={{margin:5}}>Employeer?</Label>
                        <CheckBox style={{margin:5}} checked={this.state.checked} onPress={(id)=>this.handleCheckbox(id)} />    
                    </View>    
                    <Button block rounded  primary style={{padding: 10, margin:10}} onPress={()=>this.performSignUp()}>
                        <Text> Sign Up </Text></Button>
                    {/* <Button block rounded primary style={{ padding:10, margin:10 }} onPress={() => navigation.navigate('Login')}>
                        <Text> Login </Text>
                    </Button> */}
                    
                    </Form>
                </Container>
            </Root>
        
        );
    }
}