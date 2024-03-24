import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';

export default function Cloud({color,left,top}) {
  return (
    <View style={{left:left,top:top,opacity:0.2,position:'absolute'}}>
      <FontAwesome name="cloud" size={152} color={color}/>
    </View>
  )
}

const styles = StyleSheet.create({})