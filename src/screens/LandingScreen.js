import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { AuthContext } from './../components/Context';
import Geolocation from 'react-native-geolocation-service';
//import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { COLORS } from './../constants'
import Icon from 'react-native-vector-icons/Feather';
var { width, height } = Dimensions.get('window');

const LandingScreen = () => {
    Geocoder.init("AIzaSyDQhSiIDIFiyK76Cz7C2sSnvtW2_4_jAEc");
    const [displayAddress, setDisplayAddress] = useState("Waiting for Current Location")

    useEffect(() => {
        Geolocation.getCurrentPosition(
            (position) => {
                geoSuccess(position);
            },
            (error) => {
                geoError(error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    })

    const { setAddress } = React.useContext(AuthContext);

    async function getAddress(coords){
        Geocoder.from(coords.latitude, coords.longitude)
        .then(json => {
            var currentAddress = json.results[0].formatted_address;
            setDisplayAddress(currentAddress);
            setTimeout(() =>{
                setAddress(currentAddress, coords.longitude, coords.latitude)
            }, 2000)
           
        })
        .catch(error => console.warn(error));
    }

    async function geoSuccess(position){
        getAddress(position.coords);
    }

    async function geoError(error){
        console.log('geoError');
        console.log(error.code, error.message);
    }

    return (
        <View style={style.container}>
            <StatusBar backgroundColor={COLORS.bg} barStyle="dark-content" />
            <View style={style.body}>
                <Icon style={style.map} name='map-pin' />
                <View style={style.addressContainer}>
                    <Text style={style.addressTitle}>Your Delivery Address</Text>
                </View>
                <Text style={style.addressText}>{displayAddress}</Text>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg
    },
    
    body: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.bg
    },
    map: {
        color: COLORS.primary,
        fontSize: 90
    },
    addressContainer: {
        width: width - 100,
        borderBottomColor: COLORS.primary,
        borderBottomWidth: 0.5,
        padding: 5, 
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    addressTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.black
    },
    addressText: {
        color: COLORS.textGray,
        paddingHorizontal: 50
    }
})

export default LandingScreen;