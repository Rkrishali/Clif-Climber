import { StyleSheet, Text, View, Image, Dimensions, ScrollView, Alert } from "react-native";
import BoldText from "../components/BoldText";
import Password from "../components/PasswordInput";
import MyButton from "../components/button";
import { useState } from "react";
import CheckBoxText from "../components/CheckboxText";
import SignUpMethodImage from "../components/signup_method_image_component";
import CommonText from "../components/CommanText";
import BoldUnderlineText from "../components/BoldUnderlineText";
import { login } from "../services/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserInput from "../components/textinput/TextInput";

const LogIn = ({ navigation }) => {
    const [isHide, setIsHide] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const storeToken = async (token) => {
        try {
            await AsyncStorage.setItem("token", token);
        } catch (error) {
            // Error saving data
        }
    };

    const hidePassword = () => {
        setIsHide(!isHide);
    };

    const loginUser = async () => {
        let valid = true;

        if (!email) {
            setEmailError('Email is required');
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            setEmailError('Invalid email format');
            valid = false;
        } else {
            setEmailError('');
        }

        if (!password) {
            setPasswordError('Password is required');
            valid = false;
        } else {
            setPasswordError('');
        }

        if (!valid) return;

        setIsLoading(true);

        const userData = {
            username: email.trim(),
            password: password,
            deviceToken: "uuuuu"
        };

        try {
            const result = await login(userData);
            storeToken(result.data.token);
            setIsLoading(false);
            navigation.navigate("HomeTabs");
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            Alert.alert('Error', 'Failed to Login');
        }
    };

    return (
        <View style={styles.rootContainer}>
            <View style={{ flex: 1, marginHorizontal: 10 }}>
                <Image
                    style={styles.logoImage}
                    resizeMode="contain"
                    source={require("../assets/clif_logo.png")}
                />

                <ScrollView
                    scrollIndicatorInsets={false}
                    contentContainerStyle={styles.scrollContainer}
                >
                    <View style={styles.innerScrollContainer}>
                        <BoldText>Login</BoldText>
                        <CommonText>I am a returning customer</CommonText>
                        <BoldText>Email</BoldText>
                        <UserInput
                            errorMessage={emailError}
                            onTextChanged={setEmail}
                            value={email}
                        />

                        <BoldText>Password</BoldText>
                        <Password
                            passwordError={passwordError}
                            onTextChanged={setPassword}
                            value={password}
                            isHide={isHide} onPress={hidePassword} />

                        <View style={styles.forgetPassSignupContainer}>
                            <BoldUnderlineText>Forgot Password ?</BoldUnderlineText>
                            <BoldUnderlineText onPress={() => navigation.navigate("Signup")}>
                                SignUp
                            </BoldUnderlineText>
                        </View>
                        <View style={{ height: 10 }} />
                        <MyButton
                            loading={isLoading}
                            onPress={loginUser}
                        >
                            Continue
                        </MyButton>

                        <CheckBoxText>Or continue with social account</CheckBoxText>

                        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
                            <SignUpMethodImage image={require("../assets/google_icon.png")} />
                            <SignUpMethodImage image={require("../assets/facebook_icon.png")} />
                        </View>

                        <View style={styles.alreadyHadAccountContainer}>
                            <CheckBoxText>If you already have an account ?</CheckBoxText>
                            <Text style={{ color: 'blue', fontSize: 15, fontWeight: 'bold', marginStart: 5 }}>
                                Terms & Conditions
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: "white",
    },
    logoImage: {
        width: height * 0.3,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    innerScrollContainer: {
        flex: 1,
        paddingBottom: 10,
    },
    alreadyHadAccountContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    forgetPassSignupContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    }
});

export default LogIn;
