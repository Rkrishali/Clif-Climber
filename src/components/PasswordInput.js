import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions, Pressable, StyleSheet, TextInput, View } from 'react-native';
import ValidationText from './ValidationText';


const Password = ({ onPress, isHide, value, onTextChanged, passwordError }) => {
    return (
        <View
        >

            <View
                style={[styles.inputStyle, styles.inputOuterContainer, passwordError ? { borderColor: 'red', borderWidth: 1 } : null]}
            >
                <TextInput
                    onChangeText={onTextChanged}
                    value={value}
                    secureTextEntry={isHide}
                    style={{ flex: 1, fontSize: h * 0.02 }} />
                <Pressable
                    onPress={onPress}
                >
                    <Icon name={isHide ? "eye" : "eye-slash"} size={30} color="black" />
                </Pressable>


            </View>
            <ValidationText>{passwordError}</ValidationText>
        </View>
    )
}

const h = Dimensions.get('window').height
const styles = StyleSheet.create({

    inputStyle: {
        backgroundColor: '#f0f4f7',
        borderRadius: 10,

    },
    inputOuterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingEnd: 10,
        flex: 1
    }
})

export default Password