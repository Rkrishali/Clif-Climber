// logoutDialogStyles.js
import { StyleSheet, Dimensions } from 'react-native';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    innerContainer: {
        backgroundColor: 'white',
        height: h * 0.4,
        width: w - 40,
        overflow: 'hidden',
        borderRadius: 20,
    },
    innerTopContainer: {
        flex: 1,
        backgroundColor: "#32cdbb",
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerBottomContainer: {
        backgroundColor: "white",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default styles;
