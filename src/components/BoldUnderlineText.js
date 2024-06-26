import { Pressable, StyleSheet, Text } from "react-native"

const BoldUnderlineText = ({ children , onPress}) => {

    return (
        <Pressable
        onPress={onPress}
        >
             <Text
            style={styles.text}
        >
            {children}
        </Text>
        </Pressable>
       
    )
}

const styles = StyleSheet.create({

    text: {
        fontSize: 16,
        color: 'black',
        fontWeight: "bold",
        borderBottomColor: 'black',
        borderBottomWidth: 2
    }
})
export default BoldUnderlineText