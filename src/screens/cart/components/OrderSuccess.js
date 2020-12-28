import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  Dimensions,
  Image,
  Pressable
} from 'react-native';
import { COLORS } from "./../../../constants";
var { width, height } = Dimensions.get('window');

class OrderSuccess extends React.Component {
 
  render() {
    const { show, navigation } = this.props;

    return (
        <Modal
          transparent={true}
          animationType={'none'}
          visible={show}>
          <View style={styles.modalBackground}>
            <View style={styles.container}>
                <Image style={styles.icon} source={require('./../../../assets/icons/success.png')}/>
                <Text style={styles.messageText}>Đặt hàng thành công.</Text>
                <Text style={styles.description}>Bạn có thể kiểm tra đơn hàng</Text>
                <Text style={styles.description}>trong mục 'Đơn Hàng'.</Text>
                <Pressable onPress={() => navigation.navigate('Home')} style={styles.button}>
                    <Text style={styles.buttonText}>Continue Shopping</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('Order')} style={styles.buttonContinute}>
                    <Text style={styles.buttonContinuteText}>Xem đơn hàng</Text>
                </Pressable>
            </View>
          </View>
        </Modal>
      )
  }
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
	backgroundColor: '#00000040'
  },
  container: {
    backgroundColor: '#FFFFFF',
    width: width * 0.8,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
	justifyContent: 'space-around',
	zIndex: 1011,
	opacity: 1,
	paddingHorizontal: 10,
	paddingVertical: 30
  },
  icon: {
	marginBottom: 15
  },
  messageText:{
	  color: COLORS.title,
	  fontSize: 20,
	  fontWeight: 'bold',
	  marginBottom: 30
  },
  description:{
    color: COLORS.textGray,
    fontSize: 16,
    marginBottom: 5,
    paddingHorizontal: 30,
    justifyContent: 'center'
    },
    button: {
        height: 44,
        width: width * 0.6,
        backgroundColor: COLORS.primary,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    buttonText: {
        color: COLORS.white,
        fontWeight: '600',
        fontSize: 18,
    },
    buttonContinute:{
        marginTop: 20
    },
    buttonContinuteText:{
        color: COLORS.textGray,
        fontSize: 17,
    }
});

export default OrderSuccess;