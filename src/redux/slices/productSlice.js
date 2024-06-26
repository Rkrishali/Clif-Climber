import { createSlice, current } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        cart: [],
        favourite: [],

    },

    reducers: {
        addProductToCart: (state, action) => {
            state.cart = action.payload
        },
        removeFromCart: (state, action) => {

            const id = action.payload
            const index = state.cart.findIndex(cartItem => cartItem.id === id);

            if (index !== -1) {
                state.cart.splice(index, 1);
            }
        },
        updateCartProductQuantity: (state, action) => {
            const { id, qty } = action.payload;
            const product = state.cart.find(cartItem => cartItem.id === id);

            if (product) {
                product.quantity = qty;
            }
        }
        ,

        addfavouriteProductHere: (state, action) => {
            state.favourite = action.payload
        },

        addCountries: (state, action) => {
            state.countries = action.payload
        }

    }
});

export const { storeProducts,
    addProductToCart,
    removeFromCart,
    updateCartProductQuantity,
    addfavouriteProductHere,
    addCountries
} = productsSlice.actions;
export const productReducer = productsSlice.reducer;
