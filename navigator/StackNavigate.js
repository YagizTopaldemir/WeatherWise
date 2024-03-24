import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screen/HomeScreen';
import SearchScreen from '../screen/SearchScreen';
import OnBoardingScreen from '../screen/OnBoardingScreen';
import LoadingScreen from '../screen/LoadingScreen';


const Stack = createStackNavigator();

export default function StackNavigate() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Loading'>
    <Stack.Screen name="Loading" component={LoadingScreen} options={{headerShown:false}}/>
    <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
    <Stack.Screen name="Search" component={SearchScreen} options={{headerShown:false}}/>
    <Stack.Screen name="Onboarding" component={OnBoardingScreen} options={{headerShown:false}}/>
  
  </Stack.Navigator>
  </NavigationContainer>
  )
}