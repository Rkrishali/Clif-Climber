import { Dimensions, StyleSheet, Text } from "react-native"

const CheckBoxText = ({ children }) => {
    return (
        <Text
            style={[styles.text]}
        >
            {children}
        </Text>
    )

}

const h = Dimensions.get('window').height
const styles = StyleSheet.create({
    text: {
        fontSize: h * 0.02,
        color: 'black',
        textAlign:'center',
        marginVertical:5
    }
})
export default CheckBoxText