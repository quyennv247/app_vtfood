import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import SearchBar from './../../components/SearchBar';
import Slider from './components/Slider';
import ShopPopular from './components/ShopPopular';
import Category from './components/Category';
import { COLORS } from './../../constants';
import BestSeller from './components/BestSeller';
import ShopNear from './components/ShopNear';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useNavigation} from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
    const {navigate} = useNavigation();
    const [userAddress, setUserAddress] = React.useState('');

    React.useEffect(() => {
        getAddress();
    }, [])

    const getAddress = async () => {
        try {
            const currentAddress = await AsyncStorage.getItem('user_address');
            if (currentAddress !== null) {
                setUserAddress(currentAddress);
            }
        }
        catch (e) {
            alert('Failed to fetch the data from storage')
        }
    }


    return (
        <ScrollView style={style.container}>
            <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
            <SearchBar navigation={navigation}/>
            <View style={style.userAddress}>
                {
                    userAddress.length > 50
                    ?  <Text>{userAddress.substring(0, 50)} ...</Text>
                    :  <Text>{userAddress}</Text>
                }
               
            </View>
            <Slider navigate={navigate}/>
            <Category navigate={navigate}/>
            <ShopPopular navigate={navigate} />
            <BestSeller navigate={navigate}/>
            <ShopNear navigate={navigate} />
        </ScrollView>
    );
};

const style = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },

    category: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    userAddress: {
        paddingLeft: 10, 
        paddingRight: 10,
        paddingBottom: 5
    }
})

export default HomeScreen;