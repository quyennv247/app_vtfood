import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { COLORS } from "../constants";

const Spinner = ({ size }) => {
return (
		<View style={[styles.container, styles.horizontal]}>
			<ActivityIndicator animating size={size || 'large'} color={COLORS.primary} />
		</View>
	);
};

const styles = {
	container: {
		width: '100%',
		justifyContent: 'center',
		alignSelf: 'center'
	},

	horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
};


export { Spinner };