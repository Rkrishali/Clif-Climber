import React, { useState } from 'react';
import { View, Image, StyleSheet, ScrollView, Dimensions, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useWindowDimensions } from 'react-native';

const ImageSlider = ({ images }) => {
    const { width } = Dimensions.get('window');
    const height = width * 0.7;


    const [active, setActive] = useState(0);

    const change = ({ nativeEvent }) => {
        const slide = Math.ceil(
            nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
        );
        if (slide !== active) {
            setActive(slide);
        }
    };

    const nextImage = () => {
        const nextIndex = active + 1 < images.length ? active + 1 : 0;
        setActive(nextIndex);
    };

    const prevImage = () => {
        const prevIndex = active - 1 >= 0 ? active - 1 : images.length - 1;
        setActive(prevIndex);
    };

    return (
        <View>

            <FlatList
                data={images}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Image 
                    resizeMode='cover'
                     source={{ uri: item }}
                      style={[styles.image, { width: width }]} />
                )}
                horizontal
                 showsHorizontalScrollIndicator={true}
                // snapToAlignment="center"
                snapToInterval={width}
                decelerationRate="fast"
            />
            <View style={styles.arrowContainer}>
                <TouchableOpacity onPress={prevImage}>
                    <MaterialIcons name="arrow-back-ios" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={nextImage}>
                    <MaterialIcons name="arrow-forward-ios" size={30} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    image: {
        aspectRatio: 1,
    },
    arrowContainer: {
        position: 'absolute',
        top: '40%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
});

export default ImageSlider;
