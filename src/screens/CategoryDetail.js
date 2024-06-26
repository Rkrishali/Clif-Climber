import { useEffect, useState, useLayoutEffect } from "react"
import { FlatList, Image, Pressable, StyleSheet, Text, View, ActivityIndicator } from "react-native"
import { getCategoryDetail } from "../services/auth"
import IconButton from "../components/IconButton"
getCategoryDetail

const CategoryDetailScreen = ({ route, navigation }) => {


    const [category, setCategory] = useState([])
    useEffect(() => {
        getCategoryDetailData()
    }, [])

    const getCategoryDetailData = async () => {
        try {
            const { id } = route.params
            const result = await getCategoryDetail(id)
            setCategory(result.data)
        }
        catch (err) {
            console.log("Category Detetail", err)
        }
    }


    const goToCart = () => {

        navigation.navigate("Cart")
    }

    const goToFav = () =>{
        navigation.navigate("Favourite")
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <View
                    style = {{flexDirection:'row'}}
                    >
                        <IconButton
                            icon={"shopping-cart"}
                            color={'black'}
                            onPress={goToCart}
                        />
                        <View
                        style = {{width:10}}
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

    const goToProductDetail = (name) => {
        navigation.navigate("ProductDetail", { name: name })
    }

    if (category.length === 0) {
        return (
            <View
                style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
            >
                <ActivityIndicator color={"black"} size={50} />
                <Text>Wait...</Text>
            </View>
        )
    }

    return (
        <View
            style={{ flex: 1 }}
        >
            <FlatList
                data={category}
                renderItem={({ item }) => {
                    const imageUrl = "http://65.1.76.162:8081/" + item.image[0];

                    return (
                        <Pressable
                            onPress={() => goToProductDetail(item.name)}
                            style={{ flex: 1, alignItems: 'center', marginBottom: 10 }}>
                            <View style={{ width: 100, height: 100, borderColor: 'black', borderWidth: 2, marginVertical: 10 }}>
                                <Image
                                    style={{ flex: 1 }}
                                    source={{ uri: imageUrl }}
                                    resizeMode="stretch"
                                    onError={(error) => console.log("Image loading error:", error)}
                                />
                            </View>
                            <Text>{item.name}</Text>
                        </Pressable>
                    );
                }}
                numColumns={3} // Set numColumns to 3 for 3 columns
                keyExtractor={(item, index) => item.id} // Ensure each item has a unique key
            />


        </View>
    )
}


const styles = StyleSheet.create({

})
export default CategoryDetailScreen