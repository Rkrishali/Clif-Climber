// LogoutDialog.js
import React from 'react';
import { Dimensions, Modal, Text, View } from 'react-native';
import MyButton from '../button';
import styles from './style';

const h = Dimensions.get('window').height;

const LogoutDialog = ({ visible, onClose, onLogout }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.innerContainer}>
                    <View style={styles.innerTopContainer}></View>
                    <View style={styles.innerBottomContainer}>
                        <Text style={{ fontSize: h * 0.033, color: 'black' }}>
                            Are You Sure?
                        </Text>
                        <Text style={{ fontSize: h * 0.024, margin: 8 }}>
                            Do you want to logout
                        </Text>
                        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ flex: 1, marginHorizontal: 10 }}>
                                <MyButton onPress={onClose}>
                                    No
                                </MyButton>
                            </View>
                            <View style={{ flex: 1, marginHorizontal: 10 }}>
                                <MyButton onPress={onLogout}>
                                    Yes
                                </MyButton>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default LogoutDialog;
