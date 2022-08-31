import { View, Text, Button } from 'react-native'
import React from 'react'

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Home</Text>
      <Button title='navi' onPress={() => navigation.navigate('Welcome')} />
    </View>
  )
}