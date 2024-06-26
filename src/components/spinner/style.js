// spinnerStyles.js
import { StyleSheet, Dimensions } from 'react-native';

const h = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        width: h * 0.15,
        backgroundColor: "#eeeeee",
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
        justifyContent: "space-between",
        marginVertical: 5,
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: "center",
    },
});

export default styles;
