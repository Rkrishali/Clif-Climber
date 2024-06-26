// CheckBox.js
import React from 'react';
import { View } from 'react-native';
import CheckBoxText from '../CheckboxText';
import styles from './style';

const CheckBox = () => {
  return (
    <View style={styles.checkboxOuterContainer}>
      <View style={styles.checkboxContainer} />
      <CheckBoxText>Whatsapp number is same as phone number?</CheckBoxText>
    </View>
  );
}

export default CheckBox;
