import { Pressable, StyleSheet } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';

const IconButton = ({icon , color , onPress}) => { 
    return (
        <Pressable
        onPress={onPress}
        style = {({pressed}) => pressed && styles.pressed}
        >
            <Icon name = {icon} size={30} color= {color}  />
        </Pressable>
    )
}

const styles = StyleSheet.create({

    pressed:{
        opacity:0.7
    }
})
export default IconButton