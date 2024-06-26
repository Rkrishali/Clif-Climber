import { StyleSheet, Text } from "react-native"


const ValidationText = ({ children }) => {

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
        fontSize:12,
        color:'red',
        marginStart:5
    }
})

export default ValidationText