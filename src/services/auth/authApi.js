import axiosInstance from "../axiosConfig";

export const signUp = async (userData) => {
  try {
    const response = await axiosInstance.post('signup', userData);
    return response.data;
  } catch (error) {
    console.error('Error during sign-up:', error.response?.data || error.message);
    throw error;
  }
};

export const login = async (userData) => {
  try {
    const response = await axiosInstance.post('authenticate', userData);
    return response.data;
  } catch (error) {
    console.error('Error during sign-up:', error.response?.data || error.message);
    throw error;
  }
};

export const getHomeData = async (userData) => {
  try {
    const response = await axiosInstance.get('homepage', userData);
    return response.data;
  } catch (error) {
    console.error('Error during sign-up:', error.response?.data || error.message);
    throw error;
  }
};



export const getCategoryDetail = async (id) => {
  try {
    const endpoint = `subcategory/id/mobile/${id}`
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.log('Error during sign-up:', error.response?.data || error.message);
    throw error;
  }
};

export const filterProducts = async (data) => {
  try {
    const endpoint = 'all-filter-products'
    const response = await axiosInstance.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.log('Error during sign-up:', error.response?.data || error.message);
    throw error;
  }
};



export const getProductInfo = async (id) => {
  try {
    const endpoint = `products/${id}`
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.log('Error during sign-up:', error.response?.data || error.message);
    throw error;
  }
};

export const addItemToCart = async (data) => {
  try {
    const endpoint = "auth/cart/product"
    const response = await axiosInstance.post(endpoint, data)
    return response.data
  }
  catch (error) {
    console.log('Error during sign-up:', error.response?.data || error.message);
    throw error;
  }
}

export const removeItemFromCart = async (id) => {
  try {
    const endpoint = "auth/cart/" + id
    const response = await axiosInstance.delete(endpoint)
    return response.data
  }
  catch (error) {
    console.log('Error during sign-up:', error.response?.data || error.message);
    throw error;
  }
}

export const addToFav = async (data) => {
  try {
    const endpoint = "auth/favorite/product"
    const response = await axiosInstance.post(endpoint, data)
    return response.data
  }
  catch (error) {
    console.log('Error during sign-up:', error.response?.data || error.message);
    throw error;
  }
}
export const getFav = async () => {
  try {
    const endpoint = "auth/favorite/product"
    const response = await axiosInstance.get(endpoint)
    return response.data
  }
  catch (error) {
    console.log('Error during sign-up:', error.response?.data || error.message);
    throw error;
  }
}

export const getCartProduct = async () => {
  try {
    const endpoint = "auth/cart-details-for-app"
    const response = await axiosInstance.get(endpoint)
    return response.data
  }
  catch (error) {
    console.log('Error during sign-up:', error.response?.data || error.message);
    throw error;
  }
}


export const decrementQuantity = async (data) => {
  try {
    const endpoint = "auth/cart/product/decrement"
    const response = await axiosInstance.post(endpoint, data)
    return response.data
  }
  catch (error) {
    console.log('Error during sign-up:', error.response?.data || error.message);
    throw error;
  }
}

export const getCountries = async () => {
  try {
    const endpoint = "getCountries"
    const response = await axiosInstance.get(endpoint)
    return response.data
  }
  catch (error) {
    console.log('Error during sign-up:', error.response?.data || error.message);
    throw error;
  }

}



export const getState = async (countryId) => {
  try {
    const endpoint = `getStates/${countryId}`
    const response = await axiosInstance.get(endpoint)
    return response.data
  }
  catch (error) {
    console.log('Error during sign-up:', error.response?.data || error.message);
    throw error;
  }

}


export const addAddress = async (data) => {
  try {
    console.log(data)
    const endpoint = "auth/address"
    const response = await axiosInstance.post(endpoint, data)
    return response.data
  }
  catch (error) {
    console.log('Error during sign-up:', error.response?.data || error.message);
    throw error;
  }
}


export const getAddress = async () => {
  try {
    const endpoint = "auth/address"
    const response = await axiosInstance.get(endpoint)
    return response.data
  }
  catch (error) {
    console.log('Error during sign-up:', error.response?.data || error.message);
    throw error;
  }
}