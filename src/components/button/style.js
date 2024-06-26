
import { Dimensions, StyleSheet } from 'react-native';

const h = Dimensions.get('window').height
const styles = StyleSheet.create({
  buttonContainer: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: h * 0.02,
    color: 'white',
    textAlign: 'center',
  },
});

export default styles;
