import React, { Component} from 'react';
import { View, ScrollView, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { COLORS } from './../../constants';
import SliderInfo from "../slider/components/SliderInfo";
import ShopList from "../slider/components/ShopList";

const SliderScreen = ({ route, navigation }) => {
    const slider = route.params.slider;

    return (
            <SafeAreaView style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" />
                <ScrollView>
                    <SliderInfo navigation={navigation} slider={slider} />
                    <ShopList navigation={navigation} sliderId={slider.Id} />
                </ScrollView>
            </SafeAreaView>
        );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg
    },
})

export default SliderScreen;