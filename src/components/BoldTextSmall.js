import React from "react"
import { Dimensions, StyleSheet, Text } from "react-native"

const BoldTextSmall = React.memo(({children}) => {

    return(
        <Text
        ellipsizeMode="tail"
        numberOfLines={2}
        style = {style.text}
        >
            {children}
        </Text>
    )
})

const h = Dimensions.get('window').height

const style = StyleSheet.create({

    text:{
        fontSize:h * 0.022,
        fontWeight:'bold',
        color:'black'
    }
})

export default BoldTextSmall