// MyButton.js
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import styles from './style';

const MyButton = React.memo(({ children, onPress, disable, color, loading, style }) => {
  return (
    <TouchableOpacity
      onPress={disable || loading ? null : onPress}
      style={[
        styles.buttonContainer,
        disable ? { backgroundColor: 'grey' } : { backgroundColor: color || 'black' },
        !disable ? style : null,
      ]}
      disabled={disable || loading}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={styles.buttonText}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
});

export default MyButton;
