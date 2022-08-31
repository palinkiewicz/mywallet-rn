import { View } from 'react-native'
import { Appbar, Text, Button } from 'react-native-paper';

export default function WelcomeScreen({ navigation }) {
  return (
    <View>
        <Text>Welcome</Text>
        <Button onPress={() => navigation.navigate('Home')}>Go home</Button>
    </View>
  )
}