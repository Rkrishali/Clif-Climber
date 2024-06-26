import { useEffect, useState, useLayoutEffect } from "react"
import { StyleSheet, Text, View, FlatList, Image, Dimensions, ScrollView, ActivityIndicator, Pressable } from "react-native"
import { getProductInfo } from "../services/auth"
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useDispatch } from "react-redux"
import IconButton from "../components/IconButton"
import MyButton from "../components/button"
import { addItemToCart, addToFav } from "../services/auth/authApi"
import { addProductToCart, addfavouriteProductHere } from "../redux/slices/productSlice"
import { getCartProduct } from "../services/auth/authApi"
import Loading from "../components/loading/Loading"
import { showSnackbar } from "../components/snackbar/Snackbar"

const ProductInfo = ({ route, navigation }) => {

    const { id } = route.params
    const [productInfo, setProductInfo] = useState([])
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [isAddingFav, setIsAddingFav] = useState(false)

    useEffect(() => {
        getProductInformation()
    }, [id])  // Adding 'id' as a dependency to useEffect

    const getProductInformation = async () => {
        try {
            const result = await getProductInfo(id)
            setTimeout(() => {
                setProductInfo(result.data)

            }, 1000);
        }
        catch (err) {
            console.log(err)
        }
    }

    const goToCart = () => {

        navigation.navigate("Cart")
    }


    const goToFav = () => {
        navigation.navigate("Favourite")
    }


    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
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
                );
            }
        });
    }, [navigation]);


    const addToCart = async () => {
        try {
            setIsLoading(true)
            const data = { productId: id, noOfItems: 1 }
            const result = await addItemToCart(data)
            showSnackbar("Added to Cart")
            getAddedProductInCart()
            setIsLoading(false)
        }
        catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    }

    const getAddedProductInCart = async () => {
        try {
            const result = await getCartProduct();
            dispatch(addProductToCart(result.data.items));
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const addProductToFav = async () => {
        try {
            setIsAddingFav(true)
            const data = { productId: id }
            const result = await addToFav(data)
            showSnackbar("Added as Favourite")
            setTimeout(() => {
                setIsAddingFav(false)
            }, 1000);
        }
        catch (error) {
            setTimeout(() => {
                setIsAddingFav(false)
            }, 1000);
            console.log(error)
        }
        finally {


        }
    }





    if (productInfo.length === 0) {
        return (
            <Loading />
        )
    }
    return (
        <View
        >
            <View
                style={{ height: '85%', }}
            >
                <ScrollView
                    nestedScrollEnabled
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
                >
                    <View >
                        <FlatList
                            pagingEnabled
                            horizontal
                            data={productInfo.image}
                            keyExtractor={(item, index) => index}  // Ensure keyExtractor returns a string
                            renderItem={({ item }) => {

                                return (
                                    <View
                                        style={{ width: w, height: h / 2 - 50, backgroundColor: 'white', }}
                                    >
                                        <Image
                                            resizeMode="contain"
                                            style={{ width: w, height: h / 2 - 50, backgroundColor: 'white', borderColor: 'black', borderWidth: 2 }}
                                            source={{ uri: `http://65.1.76.162:8081/${item}` }}
                                        />

                                    </View>
                                );
                            }}
                            ListEmptyComponent={<Text>No data available</Text>}  // Add a fallback when the list is empty
                        />

                        <View
                            style={{ backgroundColor: 'white', marginHorizontal: 10, marginTop: 20, elevation: 10, padding: 10 }}
                        >
                            <Text
                                style={{
                                    color: 'black',
                                    fontWeight: 'bold',
                                    fontSize: 20,
                                }}
                            >
                                {productInfo.name}
                            </Text>
                            <Text>
                                {productInfo.shortDescription}
                            </Text>
                            <Text
                                style={{ fontSize: 20, color: 'black', fontWeight: 'bold', marginTop: 5 }}
                            >
                                {productInfo.price}
                            </Text>

                        </View>

                        <View
                            style={{ flexDirection: 'row', backgroundColor: 'white', marginHorizontal: 10, marginTop: 20, elevation: 10, padding: 10, justifyContent: 'space-between' }}
                        >
                            <Text
                                style={{ fontSize: 18, color: 'black', fontWeight: 'bold' }}
                            >Availability</Text>
                            <Text
                                style={{ fontSize: 16, color: productInfo.qty === 0 ? 'red' : 'black' }}
                            >{productInfo.stock > 0 ? `In Stock ${productInfo.stock} PCS` : "Out of Stock"}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <View
                style={{
                    height: '15%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderColor: 'grey',
                    borderWidth: 1,
                    marginBottom: 5,
                    padding: 2
                }}
            >
                <Pressable
                    onPress={addProductToFav}
                    style={{ flex: 1, padding: 8, backgroundColor: 'grey', alignItems: "center", borderRadius: 10 }}
                >
                    {
                        isAddingFav ? <ActivityIndicator size={30} color={'white'} /> :
                            <AntDesign
                                name={"heart"}
                                color={"black"}
                                size={30} />
                    }

                </Pressable>
                <View
                    style={{ flex: 3, marginStart: 10 }}
                >
                    <MyButton
                        disable={productInfo.stock === 0 ? true : false}
                        onPress={addToCart}
                        loading={isLoading}
                    >
                        Add To Cart
                    </MyButton>
                </View>

            </View>


        </View>
    )
}

const h = Dimensions.get("window").height
const w = Dimensions.get("window").width
const styles = StyleSheet.create({

})

export default ProductInfo
