import React, { useEffect, useState, useCallback } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { ScrollView } from 'react-native-virtualized-view';
import BoldTextSmall from "../components/BoldTextSmall";
import CartItem from "../components/CartItem";
import MyButton from "../components/button";
import { useSelector, useDispatch } from "react-redux";
import { updateCartProductQuantity, addProductToCart, removeFromCart } from '../redux/slices/productSlice';
import BottomSheet from '../components/bottomsheet';
import { getCartProduct } from '../services/auth';
import { addItemToCart, removeItemFromCart } from '../services/auth/authApi';
import { decrementQuantity } from '../services/auth/authApi';
import { showSnackbar } from '../components/snackbar/Snackbar';
import ProductInfo from '../utils/ScreenName';

const MyCart = ({ navigation }) => {
  const cart = useSelector(state => state.products.cart);
  const [amount, setAmount] = useState(0);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [qty, setQty] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [currentProductId, setCurrentProductId] = useState(null);

  useEffect(() => {
    getAddedProductInCart();
  }, []);

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

  useEffect(() => {
    let totalPrice = cart.reduce((total, current) => total + current.price, 0);
    setAmount(totalPrice);
  }, [cart]);

  const removeProduct = useCallback(async (id) => {
    try {
      await removeItemFromCart(id);
      dispatch(removeFromCart(id));
      showSnackbar("Removed from Cart");
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const increaseQty = useCallback(async () => {
    setQty(qty => qty + 1);
    try {
      const data = { productId: currentProductId, noOfItems: 1 };
      await addItemToCart(data);
    } catch (error) {
      console.log(error);
    }
  }, [currentProductId]);

  const decreaseQty = useCallback(async () => {
    setQty(qty => (qty > 1 ? qty - 1 : qty));
    try {
      const data = { cartItemId: currentProductId };
      await decrementQuantity(data);
      getAddedProductInCart();
    } catch (error) {
      console.log(error);
    }
  }, [currentProductId]);

  const goToProductInfo = useCallback((id) => {
    navigation.navigate(ProductInfo, { id });
  }, [navigation]);

  const makeBottomSheetVisible = useCallback((id) => {
    setBottomSheetVisible(true);
    setCurrentProductId(id);
  }, [isBottomSheetVisible]);

  const closeBottomSheet = useCallback(() => {
    const data = {
      id: currentProductId,
      qty: qty
    };
    dispatch(updateCartProductQuantity(data));
    setCurrentProductId(null);
    setQty(1);
    setBottomSheetVisible(false);
  }, [currentProductId, qty, dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>
          Loading...
        </Text>
      </View>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>
          No Item in Cart
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        nestedScrollEnabled
        contentContainerStyle={styles.scrollContainer}>
        <View style={{ marginHorizontal: 15, marginTop: 15 }}>
          <View style={styles.toolbarContainer}>
            <BoldTextSmall>Bag {cart.length} Products</BoldTextSmall>
          </View>
          <FlatList
            data={cart}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <CartItem
                onItemPress={goToProductInfo}
                removeFromCart={removeProduct}
                showBottomSheet={makeBottomSheetVisible}
                item={item}
              />
            )}
          />

          <View style={styles.couponContainer}>
            <TextInput
              style={styles.textCouponCode}
              placeholder="Enter coupon code"
            />
            <MyButton>Apply</MyButton>
          </View>
          <View style={styles.orderDetailContainer}>
            <BoldTextSmall>ORDER DETAILS</BoldTextSmall>
            <View style={styles.orderDetailInnerContainer}>
              <Text style={{ fontSize: h * 0.022 }}>Cart Total</Text>
              <Text style={{ fontSize: h * 0.022 }}>₹ {amount}.00</Text>
            </View>
            <View style={styles.orderDetailInnerContainer}>
              <Text style={{ fontSize: h * 0.022 }}>COUPON APPLIED</Text>
              <Text style={{ fontSize: h * 0.022 }}>₹ 00</Text>
            </View>
            <View style={styles.orderDetailInnerContainer}>
              <Text style={{ fontSize: h * 0.025, color: 'black' }}>AMOUNT PAYABLE</Text>
              <Text style={{ fontSize: h * 0.022, color: 'black' }}>₹ {amount}.00</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Text style={styles.totalAmountText}>₹ {amount}.00</Text>
        <MyButton>PROCEED TO PAYMENT</MyButton>
      </View>
      <BottomSheet
        increase={increaseQty}
        decrease={decreaseQty}
        qty={qty}
        isVisible={isBottomSheetVisible}
        onClose={closeBottomSheet}
      >
        <Text style={{ fontSize: 20, marginBottom: 20 }}>Payment Details</Text>
        {/* Add more content for payment details here */}
      </BottomSheet>
    </View>
  );
};

const h = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  toolbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textCouponCode: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    fontSize: h * 0.025,
    flex: 1,
    marginHorizontal: 10,
  },
  couponContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    marginTop: 30,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderDetailContainer: {
    backgroundColor: 'white',
    marginTop: 20,
    padding: 10,
  },
  orderDetailInnerContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomContainer: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  totalAmountText: {
    flex: 1,
    fontSize: h * 0.03,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default MyCart;
