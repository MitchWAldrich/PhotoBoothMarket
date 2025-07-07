import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get('window');

export const photoFilterStyles = StyleSheet.create({

  container: {
    flex: 1,
    // backgroundColor: 'grey',
  },
  fullImage: {
    height: width,
    width: height,
      resizeMode: 'contain',
  },
  imageContainer: {
      height: width,
      width: height,
      backgroundColor: 'blue',
    },
});