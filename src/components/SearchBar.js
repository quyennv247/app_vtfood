import React from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { ICONS, COLORS } from '../constants';

const SearchBar = ({ navigation }) => {
    return (
        <View style={style.container}>
            <View style={style.searchBar}>
                <Image style={style.searchIcon} source={ICONS.search}></Image>
                <Pressable onPress={() => navigation.navigate('Search')} style={style.searchBtn}>
                    <Text  style={style.searchText}>Tìm kiếm</Text>
                </Pressable> 
            </View>
            <View style={style.searchFilter}>
                <Image source={ICONS.filter}></Image>
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 20
    },

    searchBar: {
        flex: 9,
        backgroundColor: COLORS.white,
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 20,
        paddingLeft: 5,
        paddingRight: 10,
        borderWidth: 2,
        borderColor: COLORS.grey
    },

    searchIcon: {
        height: 20,
        width: 20,
        paddingLeft: 5
    },
    
    searchBtn: {
        marginLeft: 0,
        flex: 9,
        display: 'flex',
        fontSize: 16,
        height: 52
    },

    searchFilter: {
        flex: 1,
        paddingLeft: 8
    },

    searchText:{
        color: COLORS.textGray,
        paddingTop: 14,
        paddingLeft: 10,
        fontSize: 16
    }
})


export default SearchBar;

