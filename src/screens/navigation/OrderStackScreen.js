import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OrderScreen from '../order';

const OrderStack = createStackNavigator();

const OrderStackScreen = () => {
  return (
    <OrderStack.Navigator>
      <OrderStack.Screen name="Order" options={{headerShown: false}} component={OrderScreen} />
    </OrderStack.Navigator>
  );
}

export default OrderStackScreen;
