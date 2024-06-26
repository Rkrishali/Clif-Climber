import React from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Setting = ({ children, icon , onPress}) => {
    return (
        <Pressable
        onPress={onPress}
        >
            <View style={styles.container}>
                <MaterialIcons name={icon} size={h * 0.035} color="black" />
                <Text style={styles.text}>{children}</Text>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <MaterialIcons name="arrow-forward-ios" size={h * 0.03} color="black" />
                </View>
            </View>
            <View style={styles.line} />
        </Pressable>
    );
};

const h = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        paddingVertical: 14,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
    },
    line: {
        borderBottomColor: 'grey', // or any color you prefer
        borderBottomWidth: 1,
    },
    text: {
        fontSize: h * 0.022,
        color: 'black',
        marginStart: 15,
        fontWeight:'bold',
        flex:5
    },
});

export default Setting;
