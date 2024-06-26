import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, ScrollView } from "react-native"
import MyButton from "../components/button"
import BoldText from "../components/BoldText"
import UserInput from "../components/textinput/TextInput"
import DropdownComponent from "./Dropdown"
import { addAddress, getCountries, getState } from "../services/auth"
import { useDispatch } from "react-redux"
import { setAllCountries, setAllStates, setSelectedCountryId, setSelectedState } from "../redux/slices/addressSlice"
import { useSelector } from "react-redux"
import Loading from "../components/loading/Loading"

const AddAddress = () => {
  const dispatch = useDispatch()
  const selectCountryId = useSelector(state => state.address.selectedCountryId)
  const stateName = useSelector(state => state.address.selectedState)
  const [loading, setLoading] = useState(false)

  const [name, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [address3, setAddress3] = useState('')
  const [city, setCity] = useState('')
  const [postCode, setPostCode] = useState('')

  useEffect(() => {
    getCountryList()
  }, [])

  useEffect(() => {
    getStateList()
  }, [selectCountryId])

  const getCountryList = async () => {
    try {
      const result = await getCountries()
      dispatch(setAllCountries(result.data))
    } catch (error) {
      console.log(error)
    }
  }

  const getStateList = async () => {
    try {
      if (selectCountryId) {
        setLoading(true)
        const result = await getState(selectCountryId)
        dispatch(setAllStates(result.data))
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const addNewAddress = async () => {
    const data = {
      fullname: name,
      addressLineOne: address1,
      addressLineTwo: address2,
      city: city,
      state: stateName,
      phone: phone,
      country: selectCountryId.toString(),
      zipCode: postCode
    }

    try {
      const result = await addAddress(data)


      if (result.success) {
        setFullName('')
        setPhone('')
        setAddress1('')
        setAddress2('')
        setAddress3('')
        setCity('')
        setPostCode('')
        dispatch(setSelectedCountryId(null))
        dispatch(setSelectedState(null))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.rootContainer}>
        <View style={styles.innerContainer}>
          <BoldText>Full Name</BoldText>
          <UserInput
            onTextChanged={setFullName}
            value={name}
          />
          <BoldText>Phone Number</BoldText>
          <UserInput
            onTextChanged={setPhone}
            value={phone}
            inputType={'phone-pad'}
          />
          <BoldText>Address line 1</BoldText>
          <UserInput
            onTextChanged={setAddress1}
            value={address1}
          />
          <BoldText>Address line 2</BoldText>
          <UserInput
            onTextChanged={setAddress2}
            value={address2}
          />
          <BoldText>Address line 3</BoldText>
          <UserInput
            onTextChanged={setAddress3}
            value={address3}
          />
          <BoldText>Country</BoldText>
          <DropdownComponent
            data={"countries"}
          />
          {selectCountryId && (
            <>
              <BoldText>State</BoldText>
              <DropdownComponent data={"states"} />
            </>
          )}
          <BoldText>City</BoldText>
          <UserInput
            onTextChanged={setCity}
            value={city}
          />
          <BoldText>Post Code</BoldText>
          <UserInput
            onTextChanged={setPostCode}
            value={postCode}
          />

        </View>
      </ScrollView>
      <MyButton
        style={styles.button}
        onPress={addNewAddress}
      >Add</MyButton>
    </View>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flexGrow: 1,
    backgroundColor: 'white',
    padding: 20
  },
  innerContainer: {
    backgroundColor: 'white',
    paddingBottom: 20
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  button: {
    paddingVertical: 15
  }
})

export default AddAddress
