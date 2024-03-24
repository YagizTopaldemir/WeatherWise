import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome,Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import Cloud from '../component/cloud';
import { debounce } from 'lodash';
import { fetchLocation, fetchWearherForecast } from '../api/weather';
import AsyncStorage from '@react-native-async-storage/async-storage';


const {width,height} = Dimensions.get('window')

export default function SearchScreen() {
    const [Hours,setHours] = useState('');
  const [backsgroundcolor,setBackgroundcolor] = useState('');
  const [night,setNight] = useState(false);
  const [location,setLocation] = useState([])
  const navigation = useNavigation();
    

  useEffect(() => {
    const currentTime = new Date().getHours();
    if (currentTime >= 8 && currentTime < 19) {
      setHours('afternoon')
      setNight(false)
    } else {
      setHours('night')
      setNight(true)
    }
    if(Hours === 'afternoon'){
      setBackgroundcolor('#4085ff')
    }else{
      setBackgroundcolor('#111')
    }
  })


const handlelocation = (location)=>{
  setLocation([])
  fetchWearherForecast({
    cityName:location.name,
    days:'7'
  }).then(data=>{
    newlocation(data)
    console.log('got for: ',data);
    const login = async () => {
      await AsyncStorage.setItem('login','UserapproveD')
    }
    login()
    navigation.navigate('Home');
  })
}
const newlocation = async (newloc) => {
  try {
    await AsyncStorage.setItem('cityLocation', JSON.stringify(newloc));
    console.log(newloc)
    console.log('City location stored successfully!');
  } catch (error) {
    console.log('Error storing city location:', error);
  }
}

  const handlesearch = value=>{
    if(value.length>0){
      fetchLocation({cityName: value}).then(data=> {
        setLocation(data)
      })
    }

  }

  const handletextdebounce = useCallback(debounce(handlesearch,500), [])
  


  return (
    <View style={[styles.container,{backgroundColor:backsgroundcolor}]}>
       <Cloud left={width * 0.8} top={height * 0.2} color='#fff' />
   <Cloud left={-width * 0.15} top={height * 0.7} color='#fff' />
      <View style={styles.topview}>
        <View style={{width:'20%'}}>
              <TouchableOpacity style={styles.backbut} onPress={() => navigation.goBack()}><Ionicons name="arrow-back-sharp" size={28} color="white" /></TouchableOpacity>
        </View>
        <View style={styles.searchview}>
        <TextInput
         style={styles.searchinput}
         placeholder='Find a city. . . '
         placeholderTextColor='rgba(255,255,255,0.7)'
         onChangeText={handletextdebounce}
         ></TextInput>
         <View style={{width:'15%',justifyContent:'center',alignItems:'center'}}><FontAwesome name="search" size={24} color="white" /></View>
        </View>
      </View>
      <ScrollView
      style={{top:height * 0.15}}
        showsVerticalScrollIndicator={false}
        >
       {
  location.length > 0 ? (
    location.map((item) => (
      <TouchableOpacity onPress={() => handlelocation(item)} key={item.id} style={styles.hoursweathercont}>
        <Text style={{color:'white',fontSize:17,fontWeight:'600'}}>{item.country}</Text>
        <Text style={{color:'white',fontSize:19}}>{item.region}</Text>
      </TouchableOpacity>
    ))
  ) : (
    <View style={{width:width,height:height * 0.7,justifyContent:'center',alignItems:'center'}}>
      <Text style={{color:'white'}}> currently not found a city</Text>
      <MaterialCommunityIcons name="weather-partly-cloudy" size={50} color="white" />
      </View>
  )
}
    
         <View style={{height:height * 0.2}}></View>
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    topview: {
      width: width * 0.9,
      height: height * 0.1,
      position:'absolute',
      top:height * 0.05,
      flexDirection:'row',
      justifyContent:'space-between',
    
    },
    backbut: {
      width:60,
      height:60,
      backgroundColor:'rgba(255,255,255,0.2)',
      borderRadius:10,
      justifyContent:'center',
      alignItems:'center'
    },
    searchinput: {
      width:'90%',
      height:60,
      paddingLeft:10,
      fontSize:16,
      color:'white'
    },
    searchview: {
      width:'80%',
      height:60,
      backgroundColor:'rgba(255,255,255,0.2)',
      borderRadius:10,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      paddingRight:20
    },
    hoursweathercont: {
      width:width * 0.9,
      height:height * 0.1,
      backgroundColor:'rgba(255,255,255,0.2)',
      marginTop:5,
      marginBottom:5,
      borderRadius:10,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-around',
      overflow:'hidden'
    }
})