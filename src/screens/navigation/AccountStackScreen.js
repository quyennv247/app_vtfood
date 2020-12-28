import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from '../account';
import SignInScreen from '../auth/SignInScreen';
import SignUpScreen from '../auth/SignUpScreen';
import AboutScreen from "../account/AboutScreen";
import ChangePasswordScreen from "../account/ChangePasswordScreen";
import ProfileScreen from "../account/ProfileScreen";

const AccountStack = createStackNavigator();

const AccountStackScreen = () => {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen name="Account" options={{headerShown: false}} component={AccountScreen} />
      <AccountStack.Screen name="Login" options={{headerShown: false}} component={SignInScreen} />
      <AccountStack.Screen name="Registry" options={{headerShown: false}} component={SignUpScreen} />
      <AccountStack.Screen name="About" options={{headerShown: false}} component={AboutScreen} />
      <AccountStack.Screen name="ChangePassword" options={{headerShown: false}} component={ChangePasswordScreen} />
      <AccountStack.Screen name="Profile" options={{headerShown: false}} component={ProfileScreen} />
    </AccountStack.Navigator>
  );
}

export default AccountStackScreen;
