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

var { width } = Dimensions.get('window');
import Swiper from 'react-native-swiper'
import { fetchSliders } from '../../../redux/actions/SliderAction'
import { Spinner } from './../../../components';
import { COLORS } from '../../../constants';

class _Slider extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchSliders();
    }

    handleToSliderScreen = (slider) => {
        this.props.navigate('Slider', {
            slider: slider
        });
    }

    render() {
        const { sliders } = this.props;
        let slider = sliders.data.data;

        if(sliders.loading){
            return <Spinner size="small" />;
        }
        else if(slider != null){
            return (
                <ScrollView>
                  <View style={ styles.container } >
                        <Swiper style={ styles.swiper } showsButtons={false} autoplay={true} autoplayTimeout={3}>
                            {
                                slider.map((item)=>{
                                    return(
                                        <Pressable onPress={() => this.handleToSliderScreen(item)}>
                                            <Image key={item.Id} style={styles.image} resizeMode="cover" source={{uri:item.Image.FullPath}}/>
                                        </Pressable>
                                    )
                                })
                            }
                        </Swiper>
                        <View style={{height:20}} />
                    </View>
                </ScrollView>
              );
        }
        else{
            return (
                <View>
                    <Text style={styles.notFound}>Không tìm thấy kết quả</Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        width: width, 
        alignItems:'center',
        paddingLeft: 10,
        paddingRight: 10
    },

    swiper: {
        height: width / 2
    },

    image: {
        height: width / 2,
        width: width - 20,
        borderRadius: 10,
    }, 

    notFound: {
        color: COLORS.textGray
    }
});


const mapStateToProps = state => {
   return { sliders: state.sliderReducer }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSliders: () => dispatch(fetchSliders())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(_Slider);