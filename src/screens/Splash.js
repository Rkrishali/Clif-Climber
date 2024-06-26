import { Image, StyleSheet, View } from "react-native"
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = ({ navigation }) => {


    useEffect(() => {
        setTimeout(() => {
            checkToken();
        }, 1000);

    }, []);

    const checkToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                navigation.navigate("HomeTabs")
            }
            else {
                navigation.navigate("Signup")
            }
        } catch (error) {
            console.log('Error checking token:', error);
            setInitialRoute('Signup'); // Set to Signup in case of errors
            setIsLoading(false);
        }
    };



    return (
        <View
            style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
        >
            <Image
                resizeMode="contain"
                style={{ height: 200, width: 200 }}
                source={require("../assets/clif_logo.png")} />
        </View>

    )
}

const styles = StyleSheet.create({

})

export default Splash