import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    allAddressData: [],
    states: [],
    countries: [],
    selectedCountryId: null,
    selectedCountry: null,
    selectedState: null,
};

const addresseSlice = createSlice({
    name: "address",
    initialState,
    reducers: {
        setAllAddressData: (state, action) => {
            state.allAddressData = action.payload;
        },
        setAllCountries: (state, action) => {
            state.countries = action.payload;
        },
        setSelectedState: (state, action) => {
            state.selectedState = action.payload
        },
        setAllStates: (state, action) => {
            state.states = action.payload;
        },
        setSelectedCountryId: (state, action) => {
            state.selectedCountryId = action.payload
        }
    }
});

export const {
    setAllAddressData,
    setAllCountries,
    setAllStates,
    setSelectedCountryId,
    setSelectedState
} = addresseSlice.actions;
export const addressReducer = addresseSlice.reducer;
