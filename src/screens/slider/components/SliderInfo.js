import React from 'react';
import { 
    Text,
    Image,
    StyleSheet,
    Dimensions,
    View,
    TouchableOpacity
} from 'react-native';
var { width, height } = Dimensions.get('window');
import { COLORS } from '../../../constants';

class SliderInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { navigation } = this.props;

        return (
            <View style={ styles.container }>
                <Image style={ styles.image } resizeMode="cover" source={{ uri:this.props.slider.Image.FullPath }} />
                <TouchableOpacity style={styles.btnClose} onPress={() => navigation.goBack()}>
                    <Image source={require('./../../../assets/icons/back.png')} />
                </TouchableOpacity>

                <View style={styles.header}>
                    <Text style={styles.title}>{this.props.slider.Title}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.bg,
        flexDirection: 'column',
    }, 
    
    image: {
        width: width,
        height: height * 0.3,
    },

    btnClose: {
        position: 'absolute',
        top: 30,
        paddingHorizontal: 20,
        zIndex: 9999,
        height: 40,
        width: 40,
    },

    header: {
        width: width,
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    
    title: {
        fontSize: 18,
        fontWeight: '400',
        color: COLORS.title,
    },

});


export default SliderInfo;