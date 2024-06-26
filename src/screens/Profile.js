import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import MyButton from "../components/button"
import Setting from "../components/Setting"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from "react";
import LogoutDialog from "../components/dialog";
import { CommonActions } from "@react-navigation/native";
import Favourite from "./Favourite";
import Address from "./Address";
const Profile = ({ navigation }) => {

    const loggedProfile = true
    const [dialogVisible, setDialogVisible] = useState(false);

    const openSettingDetail = () => {

    }

    const goToAddress = () => {
        navigation.navigate(Address)
    }
    const goToFav = () => {
        navigation.navigate(Favourite)
    }
    const showLogoutDialog = () => {
        setDialogVisible(true)
    }
    const logoutUser = () => {
        removeToken()
    }


    const removeToken = async () => {
        try {
            await AsyncStorage.removeItem('token')
            setDialogVisible(false)
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: "Login" }],
                })
            );
            console.log("removed token")
        } catch (error) {
            console.log("token error", error)

        }
    }


    const goToSignIn = () => {

        navigation.navigate("Login")
    }

    if (loggedProfile) {
        return (
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
            >
                <View
                >
                    {/* Render LogoutDialog if dialogVisible is true */}
                    <LogoutDialog
                        visible={dialogVisible}
                        onClose={() => setDialogVisible(false)}
                        onLogout={logoutUser}
                    />
                    <View
                        style={styles.imageAndButtonContainer}
                    >
                        <Image
                            style={styles.image}
                            source={require("../assets/app-Icon.png")} />

                    </View>
                    <View
                        style={styles.settingContainerLogged}
                    >
                        <Setting
                            onPress={openSettingDetail}
                            icon={"settings"}
                        >Profile</Setting>
                        <Setting
                            onPress={openSettingDetail}
                            icon={"assignment-return"}
                        >Your orders</Setting>
                        <Setting
                            onPress={openSettingDetail}
                            icon={"question-mark"}
                        >Track your order</Setting>
                        <Setting
                            onPress={goToAddress}
                            icon={"warehouse"}
                        >Add address</Setting>
                        <Setting
                            onPress={goToFav}
                            icon={"settings"}
                        >Wishlist</Setting>
                        <Setting
                            onPress={openSettingDetail}
                            icon={"assignment-return"}
                        >Enquiry Form</Setting>
                        <Setting
                            onPress={openSettingDetail}
                            icon={"question-mark"}
                        >Change your password</Setting>
                        <Setting
                            onPress={openSettingDetail}
                            icon={"warehouse"}
                        >Delete Account</Setting>
                    </View>
                    <Pressable
                        onPress={showLogoutDialog}
                        style={styles.settingContainerLogged}
                    >
                        <View
                            style={{ flexDirection: 'row' }}
                        >
                            <MaterialIcons name="logout" size={30} color={'red'} />
                            <Text
                                style={{ color: 'red', fontSize: h * 0.03, fontWeight: 'bold', marginStart: 10 }}
                            >
                                Log out
                            </Text>
                        </View>
                    </Pressable>
                </View>
            </ScrollView>
        )
    }

    return (
        <ScrollView
            contentContainerStyle={styles.scrollContainer}
        >
            <View
            >
                <View
                    style={styles.imageAndButtonContainer}
                >
                    <Image
                        style={styles.image}
                        source={require("../assets/app-Icon.png")} />
                    <View

                        style={{ flex: 1, marginStart: 10 }}
                    >
                        <MyButton
                            onPress={goToSignIn}
                        >
                            Sign in</MyButton>

                    </View>
                </View>

                <View
                    style={styles.settingContainer}
                >
                    <Setting
                        onPress={openSettingDetail}
                        icon={"settings"}
                    >Tearms & Conditions</Setting>
                    <Setting
                        onPress={openSettingDetail}
                        icon={"assignment-return"}
                    >Refund & Return Policy</Setting>
                    <Setting
                        onPress={openSettingDetail}
                        icon={"question-mark"}
                    >Enquiry Form</Setting>
                    <Setting
                        onPress={openSettingDetail}
                        icon={"warehouse"}
                    >Registered Office & Retail Store</Setting>
                </View>
            </View>
        </ScrollView>

    )
}

const h = Dimensions.get('window').height
const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1
    },

    imageAndButtonContainer: {
        alignItems: "center",
        flexDirection: 'row',
        paddingVertical: 50,
        paddingHorizontal: 30,
    },
    image: {
        height: h * 0.099,
        width: h * 0.099,
    },

    settingContainer: {
        backgroundColor: 'white', // Ensures the background is visible
        borderRadius: 15, // Sets the border radius
        marginHorizontal: 10,
        paddingVertical: 20, // Add padding to avoid content touching the borders
        paddingHorizontal: 10,
        elevation: 10
    },
    settingContainerLogged: {
        backgroundColor: 'white', // Ensures the background is visible     
        paddingHorizontal: 10,
        paddingVertical: 20, // Add padding to avoid content touching the borders
        elevation: 10,
        marginBottom: 10
    }
})
export default Profile