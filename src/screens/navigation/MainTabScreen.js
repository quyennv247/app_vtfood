import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from './HomeStackScreen';
import AccountStackScreen from './AccountStackScreen';
import NotificationStackScreen from './NotificationStackScreen';
import OrderStackScreen from './OrderStackScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS } from './../../constants';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "../auth/LoginScreen";
import RegistryScreen from "../auth/RegistryScreen";

const Tab = createBottomTabNavigator();

const tabBarOptions = {

    showLabel: true,
    style: {
      backgroundColor: COLORS.bgTab,
      borderTopColor: COLORS.black,
      paddingBottom: 5
    },
    activeTintColor: COLORS.primary,
    inactiveTintColor: COLORS.colorTab,
};

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused }) => {
    let iconName = "home";

    switch (route.name){

      case "Home":
        iconName = "home";
        break;
      case "Order":
        iconName = "profile";
        break;
      case "Notification":
        iconName = "bells";
        break;
      case "Account":
        iconName = "user";
        break;
      default:
        iconName = "home";
    }

    return <AntDesign name={iconName} size={24} color={ focused ? COLORS.primary : COLORS.colorTab } />;

  },
});

const MainTabScreen = () => {
    return (
        <Tab.Navigator tabBarOptions={tabBarOptions} screenOptions={screenOptions} >
            <Tab.Screen name="Home" tabBarLabel="Home" component={HomeStackScreen} />
            <Tab.Screen name="Order" options={{ tabBarLabel: 'Đơn hàng' }} component={OrderStackScreen} />
            <Tab.Screen name="Notification" options={{ tabBarLabel: 'Thông báo' }} component={NotificationStackScreen} />
            <Tab.Screen name="Account" options={{ tabBarLabel: 'Tài khoản' }} component={AccountStackScreen} />
        </Tab.Navigator>
    );
}

const AppStack = createStackNavigator();
const AppStackScreen = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="App" options={{headerShown: false}} component={MainTabScreen} />
      <AppStack.Screen name="LoginScreen" options={{headerShown: false}} component={LoginScreen} />
      <AppStack.Screen name="RegistryScreen" options={{headerShown: false}} component={RegistryScreen} />
    </AppStack.Navigator>
  );
}

export default AppStackScreen;
