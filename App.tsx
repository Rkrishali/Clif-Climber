import React, { useState, useLayoutEffect, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignUp from './src/screens/Signup';
import LogIn from './src/screens/Login';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import Icon from 'react-native-vector-icons/FontAwesome';
import MyCart from './src/screens/MyCart';
import Notification from './src/screens/Notification';
import Splash from './src/screens/Splash';
import CategoryDetailScreen from './src/screens/CategoryDetail';
import ProductDetailScreen from './src/screens/ProductDetail';
import ProductInfo from './src/screens/ProductInformation';
import { Provider } from 'react-redux';
import { store } from './src/redux/store/store';
import Favourite from './src/screens/Favourite';
import Address from './src/screens/Address';
import AddAddress from './src/screens/AddAddress';
import DropdownComponent from './src/screens/Dropdown';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Cart') {
            iconName = 'shopping-cart';
          } else if (route.name === 'Notification') {
            iconName = 'bell';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }

          return <Icon name={iconName} size={size} color={focused ? 'tomato' : 'grey'} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Cart" component={MyCart}
        options={{
          headerShown: false
        }}
      />
      <Tab.Screen name="Notification" component={Notification} />


      <Tab.Screen
        options={{
          title: "Account",
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 22,

          },
          headerTitleAlign: 'center'
        }}
        name="Profile"
        component={Profile} />
    </Tab.Navigator>
  );
}

function App() {

  return (
    <Provider
      store={store}
    >
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={SignUp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeTabs"
            component={HomeTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LogIn}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='CategoryDetail'
            component={CategoryDetailScreen} />

          <Stack.Screen
            name='ProductDetail'
            component={ProductDetailScreen} />

          <Stack.Screen
            name='ProductInfo'
            component={ProductInfo} />

          <Stack.Screen
            name='Favourite'
            component={Favourite} />


          <Stack.Screen
            name='Address'
            component={Address} />


          <Stack.Screen
            name='AddAddress'
            component={AddAddress} />

            
          <Stack.Screen
            name='Dropdown'
            component={DropdownComponent} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


const styles = StyleSheet.create({});

export default App;
