import { ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoadingScreen() {

    const navigation = useNavigation();

  useEffect(() => {
    userapprove();

  })
 
  const userapprove = async () => {
    const userasync = await AsyncStorage.getItem('login');
    if(userasync === 'UserapproveD'){
console.log('a')
    navigation.navigate('Home')
  }else{
    navigation.navigate('Onboarding')
    console.log('a')
  }
  }

  return (
    <View style={styles.container}>
     
          <Text style={{color:'white',fontWeight:'bold',fontSize:19}}>Loading. . .</Text>
          <StatusBar barStyle='light-content' translucent backgroundColor='transparent' />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#5a92f3'
    }
})