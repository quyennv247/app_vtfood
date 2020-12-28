import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from '../LandingScreen';


const LandingStack = createStackNavigator();

const LandingStackScreen = () => {
  
  return (
    <LandingStack.Navigator>
      <LandingStack.Screen name="Landing" component={LandingScreen} />
    </LandingStack.Navigator>
  );
}

export default LandingStackScreen;
