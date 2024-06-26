import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Pressable, Image, Dimensions, ActivityIndicator } from "react-native";
import IconButton from "../components/IconButton"; // Assuming you have an IconButton component
import { filterProducts } from "../services/auth"; // Assuming you have a service function to fetch products
import Loading from "../components/loading/Loading";

const { width } = Dimensions.get('window');

const ProductDetailScreen = ({ route, navigation }) => {
    const { name } = route.params;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllProduct();
    }, []);

    const getAllProduct = async () => {
        try {
            const userData = {
                subcategory: name,
            };
            const result = await filterProducts(userData); // Assuming this function fetches products from an API
            setProducts(result.data);
            setLoading(false); // Set loading to false when data is fetched
        } catch (err) {
            console.log(err);
            setLoading(false); // Ensure loading state is managed in case of error
        }
    };

    const goToProductInfo = (id) => {
        navigation.navigate("ProductInfo", { id });
    };

    const goToCart = () => {
        navigation.navigate("Cart");
    };
    const goToFav = () => {
        navigation.navigate("Favourite")
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View
                    style={{ flexDirection: 'row' }}
                >
                    <IconButton
                        icon={"shopping-cart"}
                        color={'black'}
                        onPress={goToCart}
                    />
                    <View
                        style={{ width: 10 }}
                    >

                    </View>
                    <IconButton
                        icon={"heart"}
                        color={'red'}
                        onPress={goToFav}
                    />
                </View>
            )
        });
    }, [navigation]);

    if (loading) {
        return (<Loading />)
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={({ item, index }) => {
                    const imageUrl = "http://65.1.76.162:8081/" + item.image;
                    return (
                        <Pressable
                            onPress={() => goToProductInfo(item.id)}
                            style={[
                                styles.itemContainer,
                                index === products.length - 1 ? styles.lastItem : null
                            ]}
                        >
                            <View style={styles.imageContainer}>
                                <Image
                                    style={styles.image}
                                    source={{ uri: imageUrl }}
                                    resizeMode="contain"
                                    onError={(error) => console.log("Image loading error:", error)}
                                />
                            </View>
                            <View style={styles.infoContainer}>
                                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.nameText}>{item.name}</Text>
                                <Text style={styles.priceText}>₹ {item.price}</Text>
                            </View>
                        </Pressable>
                    );
                }}
                keyExtractor={(item) => item.id.toString()} // Ensure each item has a unique key
                numColumns={3} // Set numColumns to 2 for 2 columns grid
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'column',
        margin: 5,
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 8,
        overflow: 'hidden',
    },
    lastItem: {
        marginBottom: 20, // Example: add more margin to the last item
    },
    imageContainer: {
        width: '100%',
        height: width / 3, // Adjust image height as needed
    },
    image: {
        flex: 1,
        width: null,
        height: null,
    },
    infoContainer: {
        padding: 10,
    },
    nameText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 5,
    },
    priceText: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',
    },
    flatListContent: {
        paddingVertical: 5,
        paddingHorizontal: 5,

    },
});

export default ProductDetailScreen;
