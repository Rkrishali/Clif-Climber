import React, { useEffect, useState, useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getFav, addItemToCart, getCartProduct, addToFav } from "../services/auth";
import { addProductToCart, addfavouriteProductHere } from "../redux/slices/productSlice";
import Loading from "../components/loading/Loading";
import Snackbar from "react-native-snackbar";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Favourite = ({ navigation }) => {

    const fav = useSelector(state => state.products.favourite);
    const [loadingfavPro, setLoadingfavPro] = useState(true);
    const [deletingIds, setDeletingIds] = useState([]); // Manage deleting states individually
    const [addToCartIds, setAddToCartIds] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        getFavouriteProducts();
    }, []);

    useEffect(() => {
        navigation.setOptions({
            title: "WishList"
        });
    }, [navigation]);

    const getFavouriteProducts = useCallback(async () => {
        try {
            const result = await getFav();
            setLoadingfavPro(false);
            dispatch(addfavouriteProductHere(result.data.message));
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);

    const addToCart = useCallback(async (id) => {
        try {
            setAddToCartIds(prevState => [...prevState, id]);
            const data = { productId: id, noOfItems: 1 };
            const result = await addItemToCart(data);
            console.log(result)
            await getAddedProductInCart();
            if (result.success) {
                Snackbar.show({
                    text: 'Product added to cart',
                    duration: Snackbar.LENGTH_SHORT,
                });
            }

        } catch (err) {
            console.log(err);
        } finally {
            setAddToCartIds(prevState => prevState.filter(item => item !== id)); // Remove id from deletingIds
        }
    }, []);

    const getAddedProductInCart = useCallback(async () => {
        try {
            const result = await getCartProduct();
            dispatch(addProductToCart(result.data.items));
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);

    const removeProductFromFav = useCallback(async (id) => {
        try {
            setDeletingIds(prevState => [...prevState, id]); // Add id to deletingIds
            const data = { productId: id };
            await addToFav(data);
            Snackbar.show({
                text: 'Product removed from favourites',
                duration: Snackbar.LENGTH_SHORT,
            });
            await getFavouriteProducts();
        } catch (error) {
            console.log(error);
        } finally {
            setDeletingIds(prevState => prevState.filter(item => item !== id)); // Remove id from deletingIds
        }
    }, [getFavouriteProducts]);

    if (loadingfavPro) {
        return <Loading />;
    }

    if (!fav || fav.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>
                    No Favourite Item
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.rootContainer}>
            <FlatList
                data={fav}
                renderItem={({ item, index }) => (

                    <FavouriteItem
                        item={item}
                        index={index}
                        screenWidth={screenWidth}
                        screenHeight={screenHeight}
                        isAddToCart={addToCartIds.includes(item.productId)}
                        isDeleting={deletingIds.includes(item.productId)}
                        itemQty={item.qty < 1}
                        removeProductFromFav={removeProductFromFav}
                        addToCart={addToCart}
                    />
                )}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.flatListContent}
                numColumns={2}
            />
        </View>
    );
};

const FavouriteItem = memo(({ item, index, screenWidth, screenHeight, isDeleting, isAddToCart, itemQty, removeProductFromFav, addToCart }) => (
    <View
        style={[
            styles.productRootContainer,

        ]}
    >
        <View style={styles.imageContainer}>
            <View style={styles.imageInnerContainer}>
                <Image
                    resizeMode="contain"
                    style={styles.imageInnerContainer}
                    source={{ uri: "http://65.1.76.162:8081/" + item.images }}
                />
            </View>
        </View>
        <View style={styles.contentContainer}>
            <Text
                style={styles.productName}
                numberOfLines={1} ellipsizeMode="tail">
                {item.name}
            </Text>
            <Text
                style={styles.productPrice}
            >
                {item.currency}
                {item.price}
            </Text>
            <View
                style={styles.buttonContainer}
            >
                <TouchableOpacity
                    onPress={(event) => {
                        event.persist();
                        removeProductFromFav(item.productId);
                    }}
                    style={styles.deleteIconContainer}
                >
                    {isDeleting ?
                        <ActivityIndicator /> :
                        <MaterialIcons
                            name={"delete-outline"}
                            size={25}
                            color={'black'} />}

                </TouchableOpacity>

                <TouchableOpacity
                    disabled={itemQty ? true : false}
                    onPress={() => addToCart(item.productId)}
                    style={[
                        styles.addToCartButtonContainer,
                        itemQty ? { backgroundColor: 'grey' } : null
                    ]}
                >
                    {
                        isAddToCart ?
                            <ActivityIndicator color={'white'} /> :
                            <Text style={[styles.addToCartText, { color: itemQty ? 'red' : 'white' }]}>
                                {itemQty ? "Out of Stock" : "Add To Cart"}
                            </Text>
                    }

                </TouchableOpacity>

            </View>
        </View>
    </View>
));

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        marginBottom: 10
    },
    productRootContainer: {
        flex: 1,
        height: screenHeight / 2.2,
        margin: screenWidth * 0.01,
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor: 'white',
    },
    imageContainer: {
        margin: screenWidth * 0.005,
        height: screenHeight / 3.5,
        backgroundColor: '#eeeeee',
        borderRadius: 10,
        justifyContent: 'center',
    },
    imageInnerContainer: {
        height: (screenHeight / 3.5) / 1.2,
        backgroundColor: 'white',
    },
    contentContainer: {
        flex: 1,
        marginHorizontal: screenWidth * 0.02,
        marginTop: screenHeight * 0.005,
    },
    productName: {
        fontSize: screenHeight * 0.025,
        color: 'black',
        fontWeight: 'bold'
    },
    productPrice: {
        color: 'black',
        fontWeight: 'bold',
        marginTop: screenHeight * 0.005,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: screenHeight * 0.015,

        justifyContent: 'center',
        alignItems: 'center'
    },
    deleteIconContainer: {
        height: screenHeight * 0.04,
        width: screenHeight * 0.04,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: 'center'
    },
    addToCartButtonContainer: {
        flex: 1,
        padding: screenWidth * 0.02,
        backgroundColor: 'black',
        borderRadius: 5,
        margin: screenWidth * 0.01,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addToCartText: {
        color: 'white',
        fontSize: screenHeight * 0.02
    },
    flatListContent: {
        marginVertical: screenWidth * 0.01,
        marginHorizontal: screenWidth * 0.01,
    },
});

export default Favourite;
