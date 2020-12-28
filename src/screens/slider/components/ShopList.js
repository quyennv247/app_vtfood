import React from 'react';
import { connect } from 'react-redux';
import { 
    Text,
    Image,
    StyleSheet,
    Dimensions,
    View,
    Pressable,
    FlatList,
    TouchableOpacity,
} from 'react-native';
var { width, height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLORS } from '../../../constants';
import { Spinner } from './../../../components';
import shopService from "../../../api/shopService";
import AsyncStorage from '@react-native-async-storage/async-storage'

class ShopList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 1,
            pageSize: 10,
            pager: null,
            loading: false,
            isShow: false,
            data: null,
            latitude: '',
            longitude: '',
            total: 0,
            refreshing: false,
            isLoadMore: false,
            loadingMore: false
        };
    }

    async componentDidMount() {
        await this.getLocation();
        this.setState({ loading: true });
        this.getData();
    }

    getLocation = async () => {
        var latitude = await AsyncStorage.getItem('user_lat');
        var longitude = await AsyncStorage.getItem('user_long');

        this.setState({
            latitude: latitude,
            longitude: longitude
        });
    }

    getData = () => {
        shopService.getBySlider(this.state.pageIndex, this.state.pageSize, this.state.latitude, this.state.longitude, this.props.sliderId).then((response) => {
            this.setState({ loading: false });
            if(response.statusCode == 200){
                if(response.data.Pager.PageIndex == 1){
                    this.setState({ data: response.data.Items });
                }
                else{
                    let data = this.state.data.concat(response.data.Items)
                    this.setState({ data: data });
                    this.setState({ loadingMore: false });
                }

                if(response.data.Pager.TotalPages > response.data.Pager.PageIndex){
                    this.setState({ isLoadMore: true });
                }
                else{
                    this.setState({ isLoadMore: false });
                }
                
                this.setState({ pager: response.data.Pager, total: response.data.Total });
            }
            else{
                alert(response.error);
            }
            }).finally(() => { this.setState({ loading: false });; 
        });
    }

    handleLoadMore = () => {
        this.setState({ loadingMore: true });
        this.setState({ pageIndex: this.state.pageIndex += 1 });
        this.getData();
    };

    onRefresh = () => {
        console.log('onRefresh');
    };

    handleClicktoShop(shopId){
        this.props.navigation.navigate('Shop', {
            shopId: shopId
        });
    }

    render() {

        if(this.state.loading){
            return <Spinner size="small" />;
        }
        else if(this.state.total > 0){
            return (
                <View style={ styles.container }>
                    <View style={styles.header}>
                        <Text style={styles.title}>{this.state.total} cửa hàng</Text>
                    </View>

                    <View style={styles.body}>
                        <FlatList
                            ItemSeparatorComponent={this.renderItemSeparator}
                            data={this.state.data}
                            keyExtractor={(e, i) => i.toString()}
                            renderItem={({ item }) => this.renderItem(item)}
                            ListFooterComponent={this.renderFooter.bind(this)}
                            scrollEnabled={true}
                        />
                    </View>

                </View>
              );
        }
        else{
            return (
                <View style={ styles.notFoundContainer }>
                    <Text style={styles.notFound}>Dữ liệu đang cập nhật ...</Text>
                </View>
            );
        }
    }
    
    renderFooter = () => {
        return(
            <View style={styles.footer}>
                {
                    this.state.isLoadMore
                    ? <TouchableOpacity activeOpacity={1} onPress={this.handleLoadMore} style={styles.loadMoreBtn}>  
                    {
                        this.state.loadingMore 
                        ? 
                            <Text style={styles.loadMoreText}>Đang tải...</Text>
                            
                        : <Text style={styles.btnText}>Xem thêm</Text>
                    }
                    </TouchableOpacity>
                    : null
                }
                
            </View>
        );
    };

    renderItem = (item) => {
        return (
            <Pressable onPress={() => this.handleClicktoShop(item.Id)} key={item.Id} style={styles.itemContainer}>
                <Image style={styles.image} source={{uri : item.Image.FullPath}} />
                <View style={styles.item}>
                    <Text style={styles.shopName}>{item.ShopName}</Text>
                    <Text style={styles.address}><Icon style={styles.iconMap} name='map-marker-alt' /> {item.Address}</Text>
                    <Text style={styles.map}>{item.DistanceFormat}</Text>
                </View>
            </Pressable>
        )
    }

    renderItemSeparator = () => <View style={styles.line}/>
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingBottom: 0,
        backgroundColor: COLORS.bg,
        paddingHorizontal: 10,
    }, 

    line: {
        height: 0.5,
        width: '100%',
        backgroundColor: COLORS.grey
    },

    notFoundContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: '20%'
    },

    notFound: {
        color: COLORS.textGray,
        paddingTop: 20,
        paddingBottom: 10,
        fontSize: 16
    },

    header: {
        paddingVertical: 10,
    },
    
    title: {
        color: COLORS.textGray,
        fontSize: 18,
        fontWeight: '600',
        justifyContent:'space-between',
    },

    body: {
        flex: 1
    },

    itemContainer: {
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 10,
    },

    image: {
        width: width / 3.5,
        height: width / 3.5,
        borderRadius: 5,
    },

    item: {
        flexDirection: 'column',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
    },

    shopName: {
        color: COLORS.black,
        fontSize: 16,
        fontWeight: 'bold',
        width: width - (width / 3.8) - 40
    },

    address: {
        color: COLORS.textGray,
        fontSize: 12,
        width: width - (width / 3.8) - 40
    },

    map: {
        color: COLORS.black,
        fontSize: 12,
    },

    iconMap: {
        paddingRight: 3
    },

    footer: {
        borderColor: COLORS.white,
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: COLORS.white
    },

    loadMoreBtn: {
        borderColor: COLORS.white,
        borderWidth: 0.5,
        width: width,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    loadMoreText: {
        color: COLORS.textGray
    }
});
    
export default ShopList;