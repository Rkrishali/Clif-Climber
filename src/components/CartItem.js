import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native"
import BoldTextSmall from "./BoldTextSmall"
import Spinner from "./spinner"
import React, { useState } from "react"
import { addCartProductDetail, removeCartProductDetail, removeFromCart } from "../redux/slices/productSlice"


const CartItem = React.memo(({ item, showBottomSheet, removeFromCart , onItemPress}) => {

    return (
        <Pressable
             onPress={() => onItemPress(item.id)}
            style={styles.container}
        >
            <View
                style={styles.innerContainer}
            >
                <View
                    style={styles.imageContainer}
                >
                    <View
                        style={styles.imageInnerContainer}
                    >
                        <Image
                            resizeMode="contain"
                            style={styles.image}
                            source={{ uri: "http://65.1.76.162:8081/" + item.image }}

                        />
                    </View>

                </View>
                <View
                    style={styles.contentContainer}
                >
                    <BoldTextSmall>{item.name}</BoldTextSmall>
                    <Text>In Stock : {item.qty} PCS</Text>
                    <Spinner
                        showSheet={() => showBottomSheet(item.id)}
                        qty={item.noOfItems}
                    />
                    <View
                        style={styles.amountContainer}
                    >
                        <View
                            style={{ flexDirection: 'row' }}
                        >
                            <Text>{item.noOfItems}  * </Text>
                            <Text
                                style={{ fontWeight: 'bold', color: 'black' }}
                            > ₹  {item.price}</Text>
                        </View>
                        <Text>=</Text>
                        <Text
                            style={{ fontWeight: 'bold', color: 'black' }}
                        > ₹  {item.noOfItems * item.price}.00</Text>
                    </View>
                </View>
            </View>
            <View style={styles.line} />

            <Pressable
                onPress={() => removeFromCart(item.id)}
                style={{ alignItems: "flex-end" }}
            >
                <Text
                    style={{ fontSize: h * 0.02, color: '#468ab2', borderBottomColor: '#468ab2', borderBottomWidth: 1 }}
                >
                    REMOVE
                </Text>
            </Pressable>

        </Pressable>
    )
})
const h = Dimensions.get('window').height
const styles = StyleSheet.create(
    {
        container: {
            backgroundColor: 'white',
            padding: 10,
            marginTop: 20,
        },
        innerContainer:
        {
            flexDirection: 'row',
            flex: 1,
            margin: 5,
        },
        imageContainer: {
            flex: 1,
            borderRadius: 10,
            marginEnd: 3,
            backgroundColor: '#eeeeee',
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center'
        },
        imageInnerContainer: {
            height: 100,
            width: "100%",
            backgroundColor: 'white'
        },
        image: {
            height: 100,
            width: "100%"
        },
        contentContainer: {
            flex: 2,
        },
        amountContainer: {
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'space-between'
        },
        line: {
            borderBottomColor: '#eeeeee', // or any color you prefer
            borderBottomWidth: 2,
        },

    }
)

export default CartItem