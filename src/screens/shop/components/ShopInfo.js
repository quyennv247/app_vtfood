import React from 'react';
import { connect } from 'react-redux';
import { 
    Text,
    Image,
    StyleSheet,
    Dimensions,
    View,
    ScrollView,
    Pressable
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome5';
var { width, height } = Dimensions.get('window');
import { getShopById } from '../../../redux/actions/ShopDetailAction';
import { COLORS, ICONS } from '../../../constants';
import { Spinner } from './../../../components';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from 'react-native-gesture-handler';

class ShopInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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

        this.props.getShopById(this.props.shopId, this.state.latitude, this.state.longitude);
    }

    render() {
        const { loading, data, navigation } = this.props;

        if(loading){
            return <View style={ styles.loading }><Spinner size="small" /></View>;
        }
        else if(data != null){
            return (
                <View style={ styles.container }>
                    <Image style={ styles.image } resizeMode="cover" source={{ uri:data.Image.FullPath }} />
                    <View style={styles.header}>
                        <TouchableOpacity style={ styles.btnClose } onPress={() => navigation.goBack()}>
                            <AntDesign name="close" size={24} color="#FFF" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.about}>
                        <Text style={styles.title}>{data.ShopName}</Text>
                        
                        <Text style={styles.address}>
                            <Icon style={styles.iconMap} name='map-marker-alt' /> {data.DistanceFormat}. {data.Address}
                        </Text>
                    </View>
                </View>
            );
        }
        else{
            return (
                <Text style={styles.notFound}>Không tìm thấy kết quả</Text>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg
    }, 

    loading: {
        height: height * 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white
    },
    
    notFound: {
        color: COLORS.textGray,
        paddingTop: 10,
        paddingBottom: 10,
    },

    image: {
        width: '100%',
        height: height * 0.4,
    },

    btnClose: {
        height: 40,
        width: 50
    },

    header: {
        position: 'absolute',
        top: 30,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        flexDirection: 'row',
        width: '100%',
        zIndex: 9999,
    },

    about: {
        backgroundColor: COLORS.white,
        marginBottom: 10,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10
    },
    
    iconVerified: {
        color: COLORS.primary,
        fontSize: 18
    },

    title: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.back,
        marginVertical: 8
    },

    address: {
        color: COLORS.textGray,
        fontSize: 14
    },
});


const mapStateToProps = state => {
    const { data, loading, error  } = state.shopDetailReducer;
    return { data, loading, error  }
}

const mapDispatchToProps = {
    getShopById,
}
 
export default connect(
    mapStateToProps,
    mapDispatchToProps
 )(ShopInfo);