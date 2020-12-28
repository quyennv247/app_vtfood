import React from 'react';
import { View, Text, StyleSheet, StatusBar, TextInput, Dimensions } from 'react-native';
import { COLORS } from '../../constants';
var { width, height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import Keywords from "./components/Keywords";
import SearchResult from "./components/SearchResult";
import { TouchableOpacity } from 'react-native-gesture-handler';

const SearchScreen = ({ navigation }) => {
    const [keyword, setKeyword] = React.useState('');

    const handleSearch = (keyword) => {
        setKeyword(keyword);
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
            <View style={styles.header}>
                <Icon style={styles.searchIcon} name='search-outline'></Icon>
                <TextInput 
                    placeholder="Tìm kiếm"
                    placeholderTextColor={COLORS.textGray}
                    style={styles.input}
                    autoCapitalize="none"
                    value={keyword}
                    onChangeText={(val) => handleSearch(val)}
                />
                <TouchableOpacity style={styles.btnCancel} onPress={() => navigation.goBack()}>
                    <Text style={styles.btnText}>Hủy</Text>
                </TouchableOpacity>
            </View>
            {
                keyword !== ''  ? <SearchResult navigation={navigation} keyword={keyword} /> : <Keywords handleSearch={handleSearch}/>
            }
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        backgroundColor: COLORS.white,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingRight: 15,
        paddingLeft: 15,
        alignContent: 'center',
        alignItems: 'center',
        paddingBottom: 5
    },

    searchIcon: {
        position: 'absolute',
        left: 15,
        fontSize: 24,
        color: COLORS.grey
    },

    btnCancel: {
        width: 50
    },

    btnText: {
        fontSize: 16,
        color: COLORS.textGray,
        fontWeight: '500'
    },

    input: {
        width: width - 70,
        paddingLeft: 40,
        fontSize: 18
    },
})

export default SearchScreen;