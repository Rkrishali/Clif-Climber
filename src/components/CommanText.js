import { StyleSheet, Text } from "react-native"

const CommonText = ({ children }) => {

    return (
        <Text
            style={styles.text}
        >
            {children}
        </Text>
    )
}


const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: 'black',
        marginVertical:10
    }
})
export default CommonText