import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../home';
import ShopScreen from '../shop';
import CartScreen from '../cart';
import SignInScreen from '../auth/SignInScreen';
import CategoryScreen from "../category";
import SearchScreen from "../search/SearchScreen";
import SliderScreen from "../slider";
import ShopPopularScreen from "../shopPopular";
import BestSellerScreen from "../bestSeller";

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
      <HomeStack.Screen name="Shop" options={{headerShown: false}} component={ShopScreen} />
      <HomeStack.Screen name="Cart" options={{headerShown: false}} component={CartScreen} />
      <HomeStack.Screen name="Login" options={{headerShown: false}} component={SignInScreen} />
      <HomeStack.Screen name="Category" options={{headerShown: false}} component={CategoryScreen} />
      <HomeStack.Screen name="Search" options={{headerShown: false}} component={SearchScreen} />
      <HomeStack.Screen name="Slider" options={{headerShown: false}} component={SliderScreen} />
      <HomeStack.Screen name="ShopPopular" options={{headerShown: false}} component={ShopPopularScreen} />
      <HomeStack.Screen name="BestSeller" options={{headerShown: false}} component={BestSellerScreen} />
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;
