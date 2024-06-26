import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCountry, setSelectedCountryId, setSelectedState } from '../redux/slices/addressSlice';

const DropdownComponent = ({ data }) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const countries = useSelector(state => state.address.countries);
    const states = useSelector(state => state.address.states);
    const dispatch = useDispatch();
    const isCountry = data === 'countries'

    return (
        <View style={styles.container}>
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={isCountry ? countries : states}
                maxHeight={300}
                labelField="name"
                valueField="id"
                placeholder={!isFocus ? isCountry ? 'Select Country' : 'Select State' : '...'}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    if (isCountry) {
                        dispatch(setSelectedCountryId(item.id));
                        dispatch(setSelectedCountry(item.name))
                    }
                    else {
                        dispatch(setSelectedState(item.name))
                    }
                    setValue(item.id);
                    console.log("Selected ID:", item.id);
                    setIsFocus(false);
                }}
            />
        </View>
    );
};

export default DropdownComponent;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginVertical: 13
    },
    dropdown: {
        height: 50,
        backgroundColor: '#f0f4f7',
        borderRadius: 10,
        paddingStart: 20,
        fontSize: 16,
    },
    icon: {
        marginRight: 10,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 30,
        height: 30,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});
