import { StyleSheet, Text, View, Image, Dimensions, ScrollView, Alert, Pressable } from "react-native";
import BoldText from "../components/BoldText";
import Password from "../components/PasswordInput";
import UserInput from "../components/textinput/TextInput";
import CheckBox from "../components/checkbox";
import MyButton from "../components/button";
import { useState, useCallback } from "react";
import CheckBoxText from "../components/CheckboxText";
import SignUpMethodImage from "../components/signup_method_image_component";
import { signUp } from "../services/auth";

const SignUp = ({ navigation }) => {
    const [isHide, setIsHide] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [deviceToken, setDeviceToken] = useState('');


    // State variables for error messages
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [deviceTokenError, setDeviceTokenError] = useState('');



    const hidePassword = () => {
        setIsHide(!isHide);
    };

    const goToLogin = () => {
        navigation.navigate("Login")
    }

    const signupUser = useCallback(async () => {

      
        let valid = true;

        // Validate first name
        if (!firstName.trim()) {
          setFirstNameError('First name is required');
          valid = false;
        } else {
          setFirstNameError('');
        }
    
        // Validate last name
        if (!lastName.trim()) {
          setLastNameError('Last name is required');
          valid = false;
        } else {
          setLastNameError('');
        }
    
        // Validate phone number
        if (!phoneNumber.trim()) {
          setPhoneNumberError('Phone number is required');
          valid = false;
        } else if (!/^\d+$/.test(phoneNumber.trim())) {
          setPhoneNumberError('Invalid phone number format');
          valid = false;
        } else {
          setPhoneNumberError('');
        }
    
        // Validate email
        if (!email.trim()) {
          setEmailError('Email is required');
          valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
          setEmailError('Invalid email format');
          valid = false;
        } else {
          setEmailError('');
        }
    
        // Validate password
        if (!password.trim()) {
          setPasswordError('Password is required');
          valid = false;
        } else {
          setPasswordError('');
        }


        if (!valid) return;

        setIsLoading(true)
        const userRole = 2;
        const userData = {
            user: {
                firstName,
                lastName,
                phone: phoneNumber,
                email,
                userRole,
                password,
                deviceToken
            }
        };

        try {
            const result = await signUp(userData);
            setIsLoading(false)
            //  Alert.alert('Success', 'Account created successfully');
        } catch (error) {
            setIsLoading(false)
            Alert.alert('Error', 'Failed to create account');
        }
    }, [isLoading]);


    return (
        <View style={styles.rootContainer}>
            <View style={{ flex: 1, marginHorizontal: 10 }}>
                <Image
                    style={styles.logoImage}
                    resizeMode="contain"
                    source={require("../assets/clif_logo.png")}
                />

                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.innerScrollContainer}>
                        <BoldText>Create An Account</BoldText>
                        <BoldText>First Name</BoldText>
                        <UserInput
                            errorMessage={firstNameError ? "Name required" : null}
                            onTextChanged={setFirstName}
                            value={firstName}
                        />

                        <BoldText>Last Name</BoldText>
                        <UserInput
                            errorMessage={lastNameError ? "Last name required" : null}
                            onTextChanged={setLastName}
                            value={lastName}
                        />

                        <BoldText>Phone Number</BoldText>
                        <UserInput
                            errorMessage={phoneNumberError ? "Phone required" : null}
                            onTextChanged={setPhoneNumber}
                            value={phoneNumber}
                            inputType={"phone-pad"} />

                        <BoldText>Whatsapp Number</BoldText>
                        <UserInput
                            //   value={phoneNumber}
                            inputType={"phone-pad"} />

                        <CheckBox />

                        <BoldText>Email</BoldText>
                        <UserInput
                            errorMessage={emailError ? "Email required" : null}
                            onTextChanged={setEmail}
                            value={email}
                        />

                        <BoldText>Password</BoldText>
                        <Password
                            passwordError={passwordError ? "Password required" : null}
                            onTextChanged={setPassword}
                            value={password}
                            isHide={isHide} onPress={hidePassword} />

                        <MyButton
                            loading={isLoading}
                            onPress={signupUser}
                        >
                            Register Account</MyButton>

                        <CheckBoxText>Or continue with social account</CheckBoxText>

                        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
                            <SignUpMethodImage image={require("../assets/google_icon.png")} />
                            <SignUpMethodImage image={require("../assets/facebook_icon.png")} />
                        </View>

                        <View
                            style={styles.alreadyHadAccountContainer}
                        >
                            <CheckBoxText>If you already have an account ?</CheckBoxText>
                            <Pressable
                                onPress={goToLogin}
                            >
                                <Text
                                    style={{ color: 'blue', fontSize: 15, fontWeight: 'bold', marginStart: 5 }}
                                >Log In</Text>
                            </Pressable>

                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

const { height, width } = Dimensions.get("window");

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
        alignItems: 'center'

    }
});

export default SignUp;
