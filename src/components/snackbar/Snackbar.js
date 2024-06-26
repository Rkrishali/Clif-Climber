
import Snackbar from "react-native-snackbar";
export const showSnackbar = (title) => {
    Snackbar.show({
        text: title,
        duration: Snackbar.LENGTH_SHORT,
    });
};