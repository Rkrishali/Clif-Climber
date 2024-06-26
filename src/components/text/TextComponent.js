import { Text } from "react-native"

const TextComponent = ({ style, children }) => {

    return (
        <Text
            style={style}
        >
            {children}
        </Text>
    )
}

export default TextComponent