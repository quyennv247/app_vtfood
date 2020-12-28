import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { COLORS } from '../../constants';
import CategoryInfo from './components/CategoryInfo'
import ShopList from './components/ShopList'

const CategoryScreen = ({ route, navigation }) => {
    const categoryId = route.params.categoryId;
    
    React.useEffect(() => {
        
    }, [])
    
    
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <ScrollView>
                <CategoryInfo navigation={navigation} categoryId={categoryId} />
                <ShopList navigation={navigation} categoryId={categoryId} />
            </ScrollView>
        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg
    },
    
})

export default CategoryScreen;