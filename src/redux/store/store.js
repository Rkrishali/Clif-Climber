import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "../slices/productSlice";
import {addressReducer} from '../slices/addressSlice'

export const store = configureStore({
    reducer: {
        products: productReducer,
        address: addressReducer

    }
})