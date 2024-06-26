import { View, Text } from "react-native";
import { ActivityIndicator } from "react-native";
const Loading = ({message}) => {
    console.log(message)
    return (
        <View
        style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
    >
        <ActivityIndicator color={"black"} size={50} />
        <Text>{message}...</Text>
    </View>
    );
}
export default Loading