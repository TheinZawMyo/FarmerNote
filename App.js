import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import Tab from './navigation/Tab';
import InfoScreen from './screens/InfoScreen';
import DetailScreen from './screens/DetailScreen';
import COLORS from './consts/Colors';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar animated={true} backgroundColor={COLORS.green} />
      <Stack.Navigator
        initialRouteName="Tab"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="Tab" component={Tab} />
        <Stack.Screen name="Info" component={InfoScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
