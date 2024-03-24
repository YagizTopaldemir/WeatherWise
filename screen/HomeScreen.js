import { Animated, Dimensions, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { EvilIcons,FontAwesome5,Feather,Entypo } from '@expo/vector-icons';
import Cloud from '../component/cloud';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { weatherimages, weatherimages2 } from '../contact/weatherimg';

const {width,height} = Dimensions.get('window')

export default function HomeScreen() {
  const [Hours,setHours] = useState('');
  const [backsgroundcolor,setBackgroundcolor] = useState('');
  const [night,setNight] = useState(true);
  const [weather,setWeather] = useState([])
  const navigation = useNavigation();
    
  const slideAnim = useRef(new Animated.Value(-200)).current;



  useFocusEffect(
    React.useCallback(() => {
      getlocation();
    },[])
  );





  const getlocation = async () => {
    try{
      const currentlocation = await AsyncStorage.getItem('cityLocation');
 
      setWeather(JSON.parse(currentlocation))
    }catch(err){
      console.log('get loc: ',err)
    }
  }
 

 
  useEffect(() => {
    Animated.timing(
      slideAnim,
      {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true
      }
    ).start();
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
  
  });



  return (
   <View style={[styles.container,{backgroundColor:backsgroundcolor}]}>
   <Cloud left={-width * 0.1} top={height * 0.2} color='#fff' />
   <Cloud left={width * 0.8} top={height * 0.6} color='#fff' />

     <View style={styles.topview}>
       <TouchableOpacity  style={[styles.changelocbut,{backgroundColor:night ? 'rgba(255,255,255,0.2)' : '#5a92f3'}]}><EvilIcons name="location" size={30} color={night ? '#fff' : '#fff'} /></TouchableOpacity>
       <View style={styles.locview}><Text style={styles.loctext}> {weather.location ? (
      <Text style={styles.loctext}>{weather.location.country}/{weather.location.region}</Text>
    ) : (
      <Text style={styles.loctext}>Loading...</Text>
    )}</Text>
    </View>
       <TouchableOpacity onPress={() => navigation.navigate('Search')} style={[styles.searchlocbut,{backgroundColor:night ? 'rgba(255,255,255,0.2)' : '#5a92f3'}]}><FontAwesome5 name="search" size={22} color={night ? '#fff' : '#fff'} /></TouchableOpacity>
     </View>



     <View  style={styles.degreecontain}>
      <Animated.View style={[
          styles.weatherimage,
          {
            transform: [{ translateY: slideAnim }]
          }
        ]}>
          {weather.current ? (
     <Image 
     source={weatherimages[weather.current.condition.text]}
     resizeMode='center'
     style={{width:200,height:200,backgroundColor:weatherimages[weather.current.condition.text]? 'transparent': 'rgba(0,0,0,0.2)',borderRadius:30}}
     />
    ) : (
      <Text></Text>
    )}
        
      </Animated.View>
      <Text style={styles.degreetext}>{weather.current ? (
      <Text>{weather.current.temp_c}</Text>
    ) : (
      <Text style={styles.degreetext}>Loading...</Text>
    )}°C</Text>
     </View>



     <View style={styles.weatherdetail}>
      <View style={styles.chance}>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <Feather name="cloud-drizzle" size={24} color="white" />
        <Text style={{marginLeft:4,color:'white'}}>
        {weather.current ? (
      <Text>{weather.current.precip_in}</Text>
    ) : (
      <Text >Loading...</Text>
    )}%</Text>
        </View>
       <Text style={styles.weatherdetailtext}>Chance of rain</Text> 
       </View>

      <View style={styles.detailline}></View>
      <View style={styles.air}>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <Feather name="wind" size={24} color="white" />
        <Text style={{marginLeft:4,color:'white'}}> {weather.current ? (
      <Text>{weather.current.wind_kph}</Text>
    ) : (
      <Text >Loading...</Text>
    )}</Text>
        </View>
        <Text style={styles.weatherdetailtext}>Wind kp/h</Text>
   </View>
      <View style={styles.detailline}></View>
      <View style={styles.humidty}>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <Entypo name="drop" size={24} color="white" />
        <Text style={{marginLeft:4,color:'white'}}> {weather.current ? (
      <Text>{weather.current.humidity}</Text>
    ) : (
      <Text >Loading...</Text>
    )}%</Text>
        </View>
        <Text style={styles.weatherdetailtext}>Humidity</Text>
   </View>
     </View>
    <View style={styles.hoursweather}>
      <View style={styles.hoursweathertopview}>
        <Text style={{color:'white'}}>Today</Text>
        <TouchableOpacity><Text style={{color:'white'}}>Next 3 days</Text></TouchableOpacity>
      </View> 
      <View style={{height: height * 0.2,width:width,justifyContent:'center',alignItems:'center'}}>
        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        
        >
       {weather?.forecast?.forecastday?.map((item) => {
        let date = new Date(item.date);
        let options = {weekday: 'long'};
        let dayName = date.toLocaleDateString('en-US',options);
        dayName = dayName.split(',')[0]
       return(
        <TouchableOpacity key={item.id} style={styles.hoursweathercont}>
      
          <Image 
        source={weatherimages[item?.day?.condition?.text]}
        resizeMode='center'
        style={{width:50,height:50,backgroundColor:weatherimages[item?.day?.condition?.text]? 'transparent' : 'rgba(0,0,0,0.2)',borderRadius:10}}
        />
            <Text style={{color:'white'}}>{dayName}</Text>
        <Text style={{color:'white'}}>{item?.day?.avgtemp_c}°C</Text>
        </TouchableOpacity>
       )})}
         
        </ScrollView>
      </View>
    </View>
   <StatusBar barStyle='light-content' translucent backgroundColor='transparent'/>
   </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  animatedView: {
    width: 100,
    height: 100,
    backgroundColor: 'blue'
  },
  topview: {
    width:width * 0.9,
    position:'absolute',
    top:height * 0.05,
    justifyContent:'space-between',
    flexDirection:'row',
  },
  changelocbut: {
    width:50,
    height:50,

    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchlocbut: {
    width:50,
    height:50,
    backgroundColor:'#5a92f3',
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locview: {
    width:width * 0.5,

    justifyContent: 'center',
    alignItems: 'center',

  },
 
  loctext: {
    color:'white',
    fontSize:17
  },
  degreecontain: {
    justifyContent: 'center',
   
    alignItems: 'center',
    height:height * 0.4,
    marginTop:height * 0.15


  },
  degreetext:{
    color:'white',
    fontSize:60,
    fontWeight:'500'

  },
  
  weatherdetail: {
    width:width * 0.75,
    height:height * 0.15,
    justifyContent: 'space-between',
    flexDirection:'row',
    alignItems: 'center',
 
  },
  detailline: {
    width:2,
    height:'60%',
    backgroundColor:'white',
    opacity: 0.7,
  },
  chance: {
    justifyContent:'center',
    alignItems:'center',
  },
  weatherdetailtext: {
    fontSize:10,
    color:'white',
    textAlign:'center'
  },
  hoursweathertopview: {
    width: width * 0.9,
    height:height * 0.05,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  hoursweathercont: {
    width:100,
    height:120,
    backgroundColor:'rgba(255,255,255,0.3)',
    marginLeft:5,
    marginRight:5,
    borderRadius:20,
    overflow:'hidden',
    justifyContent:'space-between',
    alignItems:'center',
    padding:10,
    marginTop:10
  },
  hoursweather: {
    width:width,
    justifyContent:'center',
    alignItems:'center',
    marginTop:height * 0.05
  },
  
 

 
});