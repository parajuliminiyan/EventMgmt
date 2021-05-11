import { Body, Button, Container, Content, Header, Icon, Left, Root, Text } from 'native-base';
import React ,{Component} from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class Tasks extends Component
{
    state = {
        markedDates:[],
        dateDesc:[],
        task:'',
        data:[],
        id:'',
      
    }
    async componentDidMount()
    {
        let userData = await AsyncStorage.getItem('userData');
        let data = JSON.parse(userData);
        data.id == undefined ? this.setState({id:data[0].id}) : this.setState({id:data.id});
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
                // this.setState({data:res.data})
            let remotedate = res.data;
            let dates = [];
            let datedata = [];
            remotedate.forEach((items)=>{
                    datedata.push(items);
                   return dates.push(items.startdate);
            });
            console.log(dates);
            this.setState({markedDates:dates,dateDesc:datedata});
            }).catch((err)=>console.log(err));
            
    }
    render()
    {
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
                </Content>
                <View>
            <CalendarList
             // Callback which gets executed when visible months change in scroll view. Default = undefined
             // Max amount of months allowed to scroll to the past. Default = 50
             pastScrollRange={5}
             // Max amount of months allowed to scroll to the future. Default = 50
             futureScrollRange={5}
             // Enable or disable scrolling of calendar list
             scrollEnabled={true}
             // Enable or disable vertical scroll indicator. Default = false
             showScrollIndicator={true}
             onDayPress={(day)=>this.dayPress(day)}
            //  maxDate={new Date()}
             markingType={'period'}
             markedDates={this.getmarkedDates()}
            //  markedDates={{
            //     '2021-05-20': {selected: true,startingDay: true,textColor: 'green'},
            //     '2021-05-21': { selected: true,color: 'green'},
            //     '2021-05-23': { selected: true,color: 'green'},
            //     '2021-05-24': {selected: true, endingDay: true, color: 'green'},
            //     // '2021-05-04': {disabled: true, startingDay: true, color: 'green', endingDay: true}
            //   }}
             //   ...calendarParams
             />

            </View>
                </Container>
     

        )
    }
    dayPress(day)
    {
        let date = day.dateString;
        return this.state.dateDesc.map((items)=>{
            if(items.startdate == date)
            {
               return alert(items.description);
            }
        })
    }
    getmarkedDates = () =>
    {
        let dates = this.state.markedDates;
        let mark = {
            [dates]:{marked: true,  dotColor: 'red', activeOpacity: 0,selectedColor: 'blue'}
        }  
        console.log(dates);
        return mark;
        console.log(mark);
    }
}