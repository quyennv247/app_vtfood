import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  Dimensions,
  Image
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from "../constants";
var { width, height } = Dimensions.get('window');

class MessageBox extends React.Component {
 
  render() {
    const { show } = this.props;

    return (
        <Modal
          transparent={true}
          animationType={'none'}
          visible={show}>
          <View style={styles.modalBackground}>
            <View style={styles.container}>
				<Image style={styles.icon}
					source={require('./../assets/icons/success.png')}
				/>
                <Text style={styles.messageText}>Tạo tài khoản thành công</Text>
				<TouchableOpacity style={styles.button}>
					<Text style={styles.buttonText}>Đăng nhập</Text>
				</TouchableOpacity>
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
  button: {
	  height: 44,
	  width: width * 0.6,
	  backgroundColor: COLORS.primary,
	  borderRadius: 30,
	  justifyContent: 'center',
	  alignItems: 'center'
  },
  buttonText: {
	  color: COLORS.white,
	  fontWeight: '600',
	  fontSize: 18,
  }
});

export default MessageBox;