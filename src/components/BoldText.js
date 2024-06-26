import React from "react"
import { StyleSheet, Text, View, Dimensions } from "react-native"

const BoldText = React.memo(({ children }) => {
    return (
        <View
            style={styles.textContainer}
        >
            <Text
                style={styles.textStyle}
            >
                {children}
            </Text>
        </View>
    )
})


const h = Dimensions.get('window').height
const w = Dimensions.get('window').width

const styles = StyleSheet.create({
    textContainer: {
        marginVertical: 10
    },
    textStyle: {
        fontSize: h * 0.023,
        fontWeight: 'bold',
        color: 'black'
    }

})
export default BoldText