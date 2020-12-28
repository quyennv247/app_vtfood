import React, {useState, Component} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from './../../../constants';
var { width } = Dimensions.get('window');
import { Spinner } from './../../../components';
import notificationService from "../../../api/notificationService";
import NotificationEmpty from "../components/NotificationEmpty";
import AsyncStorage from '@react-native-async-storage/async-storage';

class ListNotification extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            refreshing: false,
            pageIndex: 1,
            pageSize: 20,
            data: null,
            total: 0,
            loginRequire: true
        };
    }

    async componentDidMount() {
        this.props.navigation.addListener('focus', async () => {
            const isLogin = await this.getLoginInfo();
            if(isLogin){
                this.setState({loginRequire: false});
                this.getData();
            }
            else{
                this.setState({loginRequire: true});
                this.props.navigation.navigate('LoginScreen', {
                    screen: 'Home'
                });
            }
        }); 
    }

    handleLoadMore = () => {
        console.log('handleLoadMore');
    };

    handleRefresh = () => {
        console.log('handleRefresh');
        this.state = {
          tabId: 1,
          refreshing: true,
          pageIndex: 1,
          pageSize: 2,
          data: null
      };
    }

    getLoginInfo = async () => {
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

    getData = () => {
        this.setState({loading: true});

        notificationService.filter(this.state.pageIndex, this.state.pageSize).then((response) => {
            this.setState({loading: false});
            if(response.statusCode == 200){
                this.setState(
                {
                    data: response.data.Items,
                    total:  response.data.Total
                });
            }
            else{
                alert(response.error);
            }
        }).finally(() => {this.setState({loading: false}); });
    }

    render() {
        if(this.state.loginRequire){
            return null
        }
        else if(this.state.loading){
            return <Spinner size="small" />;
        }
        else if(this.state.total == 0){
            return <NotificationEmpty />;
        }
        else{
            return (
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={this.state.data}
                        keyExtractor={(e, i) => i.toString()}
                        renderItem={({ item }) => this.renderItem(item)}
                        ListFooterComponent={this.renderFooter.bind(this)}
                        onEndReachedThreshold={0}
                        onEndReached={() => this.handleLoadMore()}
                        scrollEnabled={true}
                    />
                </SafeAreaView>
            );
        }
    }

    
    renderItem = (item) => {
        return (
            <Pressable key={item.Id} style={styles.item}>
                <Text style={styles.tỉtle}>[{item.TypeTitle}] {item.Title}</Text>
                <Text style={styles.message}>{item.Message}</Text>
                <Text style={styles.date}>{item.CreateDate}</Text>
            </Pressable>
        )
    }

    renderItemSeparator = () => <View style={styles.line}/>

    renderFooter = () => {
        if (!this.props.loading) return <View style={styles.line}/>;
        return (
            <Spinner size="small" />
        );
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },

    line: {
        height: 0.5,
        width: width,
        backgroundColor: COLORS.bg
    },

    item: {
        backgroundColor: COLORS.white,
        marginBottom: 10,
        padding: 15,
        flexDirection: 'column',
    },

    tỉtle: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 5
    },

    message: {
        width: width,
        fontSize: 14,
        paddingBottom: 5
    },

    date: {
        fontSize: 14,
        color: COLORS.textGray,
    },
});

 
export default ListNotification;