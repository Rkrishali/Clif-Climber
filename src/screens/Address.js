import { FlatList, StyleSheet, Text, View } from "react-native"
import MyButton from "../components/button"
import { AddAddress } from "../utils/ScreenName"
import AddressComponent from "../components/item/AddressComponent"
import { useEffect, useState } from "react"
import { getAddress } from "../services/auth"

const Address = ({ navigation }) => {

    const goToAddAddress = () => {
        navigation.navigate(AddAddress)
    }

    const [address, setAddress] = useState([])


    useEffect(() => {
        getAllAddress()
    }, [])

    const getAllAddress = async () => {
        try {
            const result = await getAddress()
            setAddress(result.data)
            console.log(result.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <View
            style={{ flex: 1, justifyContent: "space-between" }}
        >
            <FlatList
                data={address}
                renderItem={({ item }) => {
                    return (
                        <AddressComponent 
                        item={item}
                        />
                    )
                }}
            />
            <MyButton
                style={styles.button}
                onPress={goToAddAddress}
            >
                Add Address</MyButton>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 15
    }
})
export default Address