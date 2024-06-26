import React from 'react';
import { StyleSheet, View, Dimensions } from "react-native";
import TextComponent from "../text/TextComponent";
import MyButton from "../button";

const { width, height } = Dimensions.get('window');

const AddressComponent = ({ item }) => {
    return (
        <View
            style={styles.rootContainer}
        >
            <View
                style={styles.contentContainer}
            >
                <TextComponent
                    style={styles.text}
                >
                    {item.addressLineOne}
                </TextComponent>
                <TextComponent
                    style={styles.text}
                >
                    {item.addressLineTwo}
                </TextComponent>
                <TextComponent
                    style={styles.text}
                >
                    {item.city} {"-"}{item.zipCode}
                </TextComponent>

                <TextComponent
                    style={styles.text}
                >
                    {item.country}
                </TextComponent>
                <TextComponent
                    style={styles.text}
                >
                    {item.state}
                </TextComponent>
            </View>
            <View
                style={{ height: 2, justifyContent: 'center' }}
            >
                <View style={styles.line} />
            </View>
            <View
                style={styles.buttonContainer}
            >
                <View
                    style={{ flex: 1 }}
                >
                    <MyButton
                        style={styles.button}
                    >
                        Delete
                    </MyButton>
                </View>

                <View
                    style={{ flex: 1 }}
                >
                    <MyButton>
                        Edit
                    </MyButton>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    rootContainer: {
        height: height * 0.3,
        backgroundColor: 'white',
        margin: 15,
        borderRadius: 15,
        elevation: 2,
        padding: 10
    },
    contentContainer: {
        flex: 1.8,
        justifyContent: 'center'
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        marginStart: width * 0.2,

    },
    text: {
        color: "black",
        fontSize: height * 0.02
    },
    line: {
        height: 1,
        backgroundColor: 'black'
    },
    button: {
        backgroundColor: 'red'
    }
});

export default AddressComponent;
