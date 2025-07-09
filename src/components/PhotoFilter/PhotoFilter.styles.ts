import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

export const photoFilterStyles = StyleSheet.create({

  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height,
    width: width,
    backgroundColor: 'grey',
  },
  fullImage: {
    height: height * .8,
    width: width * .8,
    backgroundColor: 'blue',
  },
});