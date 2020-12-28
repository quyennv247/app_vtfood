import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { COLORS } from '../../constants';
import OrderEmpty from "./components/OrderEmpty";
import OrderList from "./components/OrderList";
import orderService from "../../api/orderService";
import { Spinner } from './../../components/Spinner';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderScreen = ({ navigation }) => {
    const [pager, setPager] = React.useState({
        pageIndex: 1,
        pageSize: 20
    });

    const [loginRequire, setLoginRequire] = React.useState(true);
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState(null);
    const [total, setTotal] = React.useState(0);

    React.useEffect(() => {
        navigation.addListener('focus', async () => {
            const isLogin = await getLoginInfo();
            if(isLogin){
                setLoginRequire(false);
                getData();
            }
            else{
                setLoginRequire(true);
                navigation.navigate('LoginScreen', {
                    screen: 'Home'
                });
            }
        });
    }, [])

    const getLoginInfo = async () => {
        const accessToken = await AsyncStorage.getItem('access_token');
        const loginId = await AsyncStorage.getItem('login_id');
        const userName = await AsyncStorage.getItem('user_name');

        if(loginId == null || accessToken == null){
            return false;
        }
        else{
            return true;
        }
    }

    const getData = () => {
        orderService.getByUser(pager.pageIndex, pager.pageSize).then((response) => {
            setLoading(false);
            if(response.statusCode == 200){
                setData(response.data.Items);
                setTotal(response.data.Total);
            }
            else{
                alert(response.error);
            }
        }).finally(() => { setLoading(false); });
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={COLORS.white} barStyle="dark-content"/>
            <View style={styles.navigation}>
                <Text style={styles.headerText}>Đơn hàng của tôi</Text>
            </View>
            {
                loginRequire == false
                ?
                loading == false
                ? total > 0  ? <OrderList data={data} total={total} pager={pager}  /> : <OrderEmpty/>
                : <Spinner size="small" />
                : null
            }
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg,
    },
    navigation: {
        backgroundColor: COLORS.white,
        paddingVertical: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 15,
    },
    headerText: {
        fontSize: 18,
        color: COLORS.title,
        fontWeight: '500',
    }
})

export default OrderScreen;