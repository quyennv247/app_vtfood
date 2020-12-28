import React, {useState} from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { COLORS } from '../../constants';
import ShopInfo from './components/ShopInfo'
import ProductList from './components/ProductList'
import {useNavigation} from '@react-navigation/native';
var { width } = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage'

const ShopScreen = ({ route, navigation }) => {
    const shopId = route.params.shopId;
    const {navigate} = useNavigation();

    const [amount, setAmount] = useState(0);
    const [total, setTotal] = useState(0);

    React.useEffect(() => {
        checkCart();
    }, [])
    
    const checkCart = async () => {
        const datacart = await AsyncStorage.getItem('cart');
        
        if(datacart != null){
            const cart = JSON.parse(datacart);
            let amount = 0;
            let total = 0;
            for (let i = 0; i < cart.length; i++) {
                total += cart[i].price * cart[i].quantity;
                amount += cart[i].quantity;
            }
            
            setTotal(total.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'))
            setAmount(amount)
        }
        else{
            setTotal(0)
            setAmount(0)
        }
    }
    
    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <ScrollView >
                <ShopInfo navigation={navigation} shopId={shopId} />
                
                <ProductList navigation={navigation} shopId={shopId} checkCart={checkCart} />
            </ScrollView>
            {
                amount > 0 ? <View style={styles.cart}>
                    <TouchableOpacity onPress={() => navigate('Cart')} style={styles.cartBtn}>
                        <Text style={styles.cartText}>{amount} Món</Text>
                        <Text style={styles.cartText}>Giỏ hàng</Text>
                        <Text style={styles.cartText}>{total}đ</Text>
                    </TouchableOpacity>
                </View>
                : <View></View>
            }
            
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg
    },
    
    cart: {
        position: 'absolute',
        bottom: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: COLORS.white,
        width: '100%',
        alignItems: 'center'
    },

    cartBtn: {
        width: width * 0.9,
        padding: 10,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom:10,
    },

    cartText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '600'
    }
})

export default ShopScreen;