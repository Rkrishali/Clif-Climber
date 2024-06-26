// UserInput.js
import React from 'react';
import { TextInput, View } from 'react-native';
import ValidationText from '../ValidationText';
import styles from './style';

const UserInput = React.memo(({ inputType, value, onTextChanged, errorMessage }) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                onChangeText={onTextChanged}
                value={value}
                keyboardType={inputType}
                style={[styles.inputStyle, errorMessage ? { borderColor: 'red', borderWidth: 1 } : null]}
            />
            {errorMessage ? <ValidationText>{errorMessage}</ValidationText> : null}
        </View>
    );
});

export default UserInput;
