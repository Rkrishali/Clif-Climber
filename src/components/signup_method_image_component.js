import { Image, StyleSheet, View } from "react-native";

const SignUpMethodImage = ({ image }) => {
  return (
    <View style={styles.imageContainer}>
      <Image resizeMode="cover" style={styles.image} source={image} />
    </View>
  );
};



const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderColor:"grey",
    borderWidth:1,
    overflow:'hidden',
    width: 50, // Set the width and height of the container
    height: 50,
    borderRadius: 50, // Half of the width and height to make it a circle
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50, // Ensure the image itself is also circular
  },
});

export default SignUpMethodImage;
