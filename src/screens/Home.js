import { useEffect, useState } from "react"
import { Dimensions, FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native"
import { getHomeData } from "../services/auth"
import ImageComponent from "../components/HomeImageContainer"
import ImageSlider from "../components/ImageSlider"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


const Home = ({ navigation }) => {

    const [categories, setCategories] = useState([])
    const images = [
        "http://65.1.76.162:8081/uploads/categories/category-1687333073539.jpg",
        'http://65.1.76.162:8081/uploads/categories/category-1687333084700.jpg',
        'http://65.1.76.162:8081/uploads/categories/category-1687333091411.jpg',
        'http://65.1.76.162:8081/uploads/categories/category-1702634415919.jpg'
    ];

    useEffect(() => {
        getData()
    }, [])

    const categoryDetailScreen = (id) => {

        navigation.navigate("CategoryDetail", { id: id })
    }
    const getData = async () => {
        try {
            const result = await getHomeData();
            setCategories(result.data.categories)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <View
                style={styles.rootContainer}
            >
                <ImageBackground
                    source={require("../assets/shopbg.png")}
                    style={styles.imageBackground}
                >

                    <FlatList horizontal
                        data={categories}
                        renderItem={(item) => {
                            const name = item["item"]["name"]
                            const image = item["item"]["MediaObjects"][0]["imageUrl"]
                            const id = item["item"]["id"]
                            return (
                                <ImageComponent
                                    onClick={categoryDetailScreen}
                                    id={id}
                                    image={image} >
                                    {name}
                                </ImageComponent>
                            )

                        }
                        }
                    />

                </ImageBackground>

                <View
                    style={styles.topSellingProductsContainer}
                >
                    <Text
                        style={{ fontSize: h * 0.02 }}
                    >
                        SEE THE BEST SELLER
                    </Text>
                    <Text
                        style={{ fontSize: h * 0.03, color: 'black', marginTop: 5 }}
                    >
                        TOP SELLING PRODUCTS
                    </Text>

                    <View
                        style={styles.topSellingProductsInnerContainer}
                    >
                        <ImageSlider images={images} />

                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const h = Dimensions.get('window').height
const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    arrowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: "100%",
        width: "100%"
    },
    imageBackground: {
        height: h * 0.3,
        resizeMode: "cover", // Cover the entire view
        justifyContent: "center",

    },
    topSellingProductsContainer: {
        backgroundColor: "#eeeeee",
        height: h * 0.4,
        marginTop: 10,
        elevation: 20,
        alignItems: 'center',
        padding: 20,
        borderColor: 'grey',
        borderWidth: 2
    },
    topSellingProductsInnerContainer: {
        height: h * 0.25,
        width: "100%",
        marginTop: 10,
        alignItems: 'center',
        borderColor: "grey",
        borderWidth: 1
    }
})
export default Home