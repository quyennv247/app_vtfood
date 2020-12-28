import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NotificationScreen from '../notification';

const NotificationStack = createStackNavigator();

const NotificationStackScreen = () => {
  return (
    <NotificationStack.Navigator>
      <NotificationStack.Screen name="Notification" options={{headerShown: false}} component={NotificationScreen} />
    </NotificationStack.Navigator>
  );
}

export default NotificationStackScreen;
