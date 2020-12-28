import React from 'react';
import { 
    Text,
    Image,
    StyleSheet,
    Dimensions,
    View,
    Pressable,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
var { width, height } = Dimensions.get('window');
import { COLORS } from '../../../constants';
import { Spinner } from './../../../components';
import AsyncStorage from "@react-native-async-storage/async-storage";
import shopService from "../../../api/shopService";

class ShopNear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 1,
            pageSize: 20,
            data: null,
            latitude: '',
            longitude: ''
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        var latitude = await AsyncStorage.getItem('user_lat');
        var longitude = await AsyncStorage.getItem('user_long');

        this.setState({
            latitude: latitude,
            longitude: longitude
        });

        shopService.getNear(this.state.pageIndex, this.state.pageSize, this.state.latitude, this.state.longitude).then((response) => {
            this.setState({ loading: false });
            if(response.statusCode == 200){
                this.setState({ data: response.data.Items, total: response.data.Total });
            }
            else{
                alert(response.error);
            }
            }).finally(() => { this.setState({ loading: false });; 
        });
    }

    handleLoadMore = () => {
        console.log('handleLoadMore');
    };

    handleClicktoShop(shopId){
        this.props.navigate('Shop', {
            shopId: shopId
        });
    }

    render() {
        if(this.state.loading){
            return <Spinner size="small" />;
        }
        else if(this.state.total > 0 ){
            return (
                <View style={ styles.container }>
                    <View style={styles.header}>
                        <Text style={styles.title}>Quanh đây có gì ngon?</Text>
                    </View>

                    <FlatList
                        ItemSeparatorComponent={this.renderItemSeparator}
                        data={this.state.data}
                        keyExtractor={(e, i) => i.toString()}
                        renderItem={({ item }) => this.renderItem(item)}
                        ListFooterComponent={this.renderFooter.bind(this)}
                        onEndReachedThreshold={0}
                        onEndReached={() => this.handleLoadMore()}
                        scrollEnabled={true}
                    />
                </View>
              );
        }
        else{
            return (
                <View style={ styles.container }>
                    <View style={styles.header}>
                        <Text style={styles.title}>Quanh đây có gì ngon?</Text>
                    </View>

                    <Text style={styles.notFound}>Không tìm thấy kết quả</Text>
                </View>
            );
        }
    }

    renderItem = (item) => {
        return (
            <Pressable onPress={() => this.handleClicktoShop(item.Id)} key={item.Id} style={styles.itemContainer}>
                <Image
                style={styles.image}
                source={{uri : item.Image.FullPath}}
                />
                <View style={styles.body}>
                    <Text style={styles.tỉtleItem}>{item.ShopName}</Text>
                    <Text style={styles.address}>{item.Address.substring(0, 80)}</Text>
                    <View style={styles.footer}>
                        <Icon style={styles.map} name='map-marker-alt' />
                        <Text style={styles.footerItemText}>{item.DistanceFormat}</Text>
                    </View>
                </View>
            </Pressable>
        )
    }

    renderItemSeparator = () => <View style={styles.line}/>

    renderFooter = () => {
        if (!this.props.loading) return null;
        return (
            <Spinner size="small" />
        );
    };
}

const styles = StyleSheet.create({
    line: {
        height: 0.5,
        width: '100%',
        backgroundColor: COLORS.grey
    },

    itemContainer: {
        flexDirection: 'row',
        marginVertical: 10,
    },

    image: {
        width: width / 3.5,
        height: width / 3.5,
        borderRadius: 10,
    },
    
    body: {
        paddingLeft: 10,
        flex: 1,
    },

    title: {
        color: COLORS.black,
        fontSize: 20,
        fontWeight: '600',
        justifyContent:'space-between',
        paddingBottom: 5
    },

    tỉtleItem: {
        fontSize: 16,
        paddingTop: 3
    },

    address: {
        fontSize: 12,
        paddingTop: 5,
        color: COLORS.textGray,
    },

    footer: {
        position: 'absolute',
        bottom: 2,
        paddingLeft: 10,
        width: '100%',
        flexDirection: 'row'
    },

    map: {
        color: COLORS.yellow
    },

    footerItemText: {
        fontSize: 12,
        color: COLORS.textGray,
        paddingLeft: 10,
    },

    container: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'center',
        paddingLeft: 10,
        marginBottom: 10
    },  

    notFound: {
        color: COLORS.textGray,
        paddingTop: 10,
        paddingBottom: 10,
    }
});
 
export default ShopNear;