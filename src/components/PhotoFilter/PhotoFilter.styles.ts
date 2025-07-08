import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get('window');

export const photoFilterStyles = StyleSheet.create({

  container: {
    flex: 1,
    // backgroundColor: 'grey',
  },
  fullImage: {
    height: 'auto',
    width: width * .8,
    resizeMode: 'cover',
  },
  imageContainer: {
    height: height * .8,
      width: width * .8,
      backgroundColor: 'blue',
    },
});