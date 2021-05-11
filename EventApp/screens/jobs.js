import { Body, Button, Container,
    Item as FormItem,
     Content, Header, Icon, Left, Root, Text, Label, Input, Form, Textarea,Toast, Spinner } from 'native-base';
import React ,{Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from 'react-native-gesture-handler';
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
export default class Jobs extends Component
{
    state = {
        name:'',
        title:'',
        workingHours:'',
        startTime:'',
        finishTime:'',
        startDate:'',
        workingDays:'',
        description:'',
        refreshing:false
      };
      async componentDidMount(){
        let userData = await AsyncStorage.getItem('userData');
        let data = JSON.parse(userData);
        data.id == undefined ? this.setState({name:data[0].fullname}) : this.setState({name:data.fullname});
        // console.log(data.id, data[0].id);
        console.log(this.state.id);
      }
    handleJobs = async() => {
        if(this.state.title == '' || this.state.workingHours == '' || this.state.startTime == ''
        || this.state.finishTime == '' || this.state.startDate == '' || this.state.workingDays == ''
        || this.state.description == '')
        {
            alert('Enter all the fields!!');
        }
        this.setState({refreshing:true});
        fetch('http://10.0.2.2:8000/api/jobs/create',{
            method:'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                title:this.state.title,
                workingHours:this.state.workingHours,
                starttime:this.state.startTime,
                finishtime:this.state.finishTime,
                startdate:this.state.startDate,
                workingdays:this.state.workingDays,
                description:this.state.description,
                postedby:this.state.name
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
            this.setState({refreshing:false});
            Toast.show({
                text: 'Jobs Created Successfully',
                buttonText: 'Okay',
                duration:3000,
                textStyle: {fontSize:17},
                type:"danger"
              });
            this.props.navigation.goBack();
        })
        .catch(err => console.log(err));
    }
    onRefresh(){
        this.setState({refreshing:true});
        wait(3000).then(() => this.setState({refreshing:false}));
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
                            <Text style={{color:'#fff'}}>Create Jobs</Text>
                        </Body>
                    </Header>
                    <ScrollView>
                    <Form> 
                    <FormItem floatingLabel style={{marginBottom:10}}>
                        <Label>Job Title</Label>
                        <Input onChangeText={(text)=> this.setState({title:text})}
                            returnKeyType="next"
                            
                        />
                    </FormItem>
                    <FormItem floatingLabel style={{marginBottom:10}}>
                        <Label>Working Hours</Label>
                        <Input onChangeText={(text)=> this.setState({workingHours:text})}
                            returnKeyType="next"
                            keyboardType="numeric"
                        />
                    </FormItem>
                    <FormItem floatingLabel style={{marginBottom:10}}>
                        <Label>Start Time</Label>
                        <Input onChangeText={(text)=> this.setState({startTime:text})}
                            returnKeyType="next"
                            keyboardType="numeric"
                        />
                    </FormItem>
                    <FormItem floatingLabel style={{marginBottom:10}}>
                        <Label>Finish Time</Label>
                        <Input onChangeText={(text)=> this.setState({finishTime:text})}
                            returnKeyType="next"
                            keyboardType="numeric"
                        />
                    </FormItem>
                    <FormItem floatingLabel style={{marginBottom:10}}>
                        <Label>Start Date</Label>
                        
                        <Input onChangeText={(text)=> this.setState({startDate:text})}
                            returnKeyType="next"
                            keyboardType="numeric"
                        /> 
                    </FormItem>
                    
                    <FormItem floatingLabel style={{marginBottom:10}}>
                        <Label>Working Days</Label>
                        <Input onChangeText={(text)=> this.setState({workingDays:text})}
                            returnKeyType="next"
                            keyboardType="numeric"
                        />
                    </FormItem>
                    <View style={{marginLeft:15, marginTop:40}}>
                    <Label>Description</Label>
                    <Textarea  rowSpan={5} bordered placeholder="Description about the job" onChangeText={(text)=> this.setState({description:text})} />
                    </View>
                    <Button rounded style={{alignSelf:'flex-end', margin:15,padding:20}} onPress={()=>this.handleJobs()} >{this.state.refreshing? <Spinner /> : <Text>Save</Text>}</Button>
                    </Form>
                
                    </ScrollView>
                    </Content>
            </Container>
        </Root>
        );
    }
 
}
