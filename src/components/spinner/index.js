// Spinner.js
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './style';

const Spinner = ({ qty, showSheet }) => {
    return (
        <Pressable onPress={showSheet} style={styles.container}>
            <Text>Qty</Text>
            <View style={styles.innerContainer}>
                <Text style={{ color: 'black', fontWeight: 'bold' }}>
                    {qty}
                </Text>
                <MaterialIcons name={"keyboard-arrow-down"} size={30} color={"black"} />
            </View>
        </Pressable>
    );
}

export default Spinner;
