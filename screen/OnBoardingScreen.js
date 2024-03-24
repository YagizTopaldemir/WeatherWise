import { Dimensions, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import Cloud from '../component/cloud';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const {width,height} = Dimensions.get('window');

export default function OnBoardingScreen() {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
           <Cloud left={-width * 0.1} top={height * 0.1} color='#fff' />
   <Cloud left={width * 0.8} top={height * 0.6} color='#fff' />
   <Cloud left={width * 0.1} top={height * 0.4} color='#fff' />
   <Cloud left={width * 0.3} top={height * 0.9} color='#fff' />
   <Cloud left={width * 0.8} top={height * 0.01} color='#fff' />
     <Onboarding
     showSkip={false}
     showNext={false}
     bottomBarHighlight={false}
     bottomBarHeight={80}
     showDone={false}
  pages={[
    {
      backgroundColor: 'transparent',
      image: <Image style={{width:250,height:250}} source={require('../assets/weather/sunny.png')} />,
      title: 'WeatherWise',
      subtitle: 'Welcome to our Weather App. We are here to help you easily track weather information.',
      titleStyles:{color:'white',fontWeight:'bold'},
      subTitleStyles:{color:'white',fontWeight:'bold'},
      
    },
    {
        
        backgroundColor: 'transparent',
        image: <Image  style={{width:250,height:250}} source={require('../assets/weather/foggy.png')} />,
        title: 'The weather information',
        subtitle: 'The weather information is ready for quick access! You can now start exploring the app. Have a great day!',
        titleStyles:{color:'white',fontWeight:'bold'},
        subTitleStyles:{color:'white',fontWeight:'bold'},
      },
      {
        
        backgroundColor: 'transparent',
        image: <Image  style={{width:250,height:250}} source={require('../assets/weather/snowfall.png')} />,
        title: <TouchableOpacity onPress={() => navigation.navigate('Search')} style={{width:width * 0.6,height:height * 0.08,borderRadius:20,backgroundColor:'rgba(255,255,255,0.8)',justifyContent:'center',alignItems:'center',borderBottomColor:'rgba(0,0,0,0.3)',borderBottomWidth:4,flexDirection:'row'}}><Ionicons name="location-outline" size={24} color="#5a92f3" /><Text style={{color:'#5a92f3',fontSize:18,fontWeight:'bold'}}>Choose a location</Text></TouchableOpacity>,
        subtitle: '',
        titleStyles:{color:'white',fontWeight:'bold'},
        subTitleStyles:{color:'white',fontWeight:'bold'},
      },
    
    ]}
/>
<StatusBar barStyle='light-content' translucent backgroundColor='transparent' />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#5a92f3'
       
        
    }
})