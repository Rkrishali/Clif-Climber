// BottomSheet.js
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Modal from 'react-native-modal';
import MyButton from '../button';
import styles from './style';

const BottomSheet = React.memo(({ isVisible, onClose, children, qty, increase, decrease }) => {
  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onClose}
      style={styles.modal}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Select quantity</Text>
        </View>
        <View style={styles.quantityContainer}>
          <Pressable
            onPress={decrease}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>-</Text>
          </Pressable>
          <Text style={styles.quantityText}>{qty}</Text>
          <Pressable
            onPress={increase}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>+</Text>
          </Pressable>
        </View>
        <View style={styles.centeredContainer}>
          <MyButton onPress={onClose}>Done</MyButton>
        </View>
      </View>
    </Modal>
  );
});

export default BottomSheet;
