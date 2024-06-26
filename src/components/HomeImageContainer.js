import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native"

const ImageComponent = ({ image, children, onClick, id }) => {

    return (
        <Pressable
            onPress={() => onClick(id)}
            style={styles.rootContainer}
        >
            <View
                style={styles.imageContainer}
            >
                <Image
                    resizeMode="cover"
                    style={styles.image}
                    source={{ uri: "http://65.1.76.162:8081/" + image }}
                />

            </View>
            <Text
                numberOfLines={2} ellipsizeMode="tail"
                style={styles.text}
            >
                {children}
            </Text>
        </Pressable>

    )
}

const h = Dimensions.get('window').height
const styles = StyleSheet.create({

    rootContainer: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: h * 0.3,
    },
    imageContainer: {
        height: h * 0.15,
        width: h * 0.15,
        overflow: "hidden",
        margin: 10,
        borderColor: 'green',
        borderWidth: 5,
        borderRadius: 100,
        overflow: 'hidden'
    },

    image: {
        height: h * 0.15,
        width: h * 0.15,
    },
    text: {
        color: "white",
        fontSize: h * 0.02,
        maxWidth: h * 0.15
    }
})
export default ImageComponent