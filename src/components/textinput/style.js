// userInputStyles.js
import { StyleSheet, Dimensions } from 'react-native';

const h = Dimensions.get('window').height;

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 1,
    },
    inputStyle: {
        backgroundColor: '#f0f4f7',
        borderRadius: 10,
        paddingStart: 20,
        fontSize: h * 0.02,
    },
});

export default styles;
