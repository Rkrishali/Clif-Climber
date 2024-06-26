// checkboxStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  checkboxOuterContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    height: 20,
    width: 20,
    borderColor: 'black',
    borderWidth: 1,
    marginVertical: 10,
    marginEnd: 10,
  },
});

export default styles;
