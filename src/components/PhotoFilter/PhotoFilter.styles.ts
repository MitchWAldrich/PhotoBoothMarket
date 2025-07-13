import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

export const photoFilterStyles = StyleSheet.create({

  imageContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'grey',
  },
  fullImage: {
    backgroundColor: 'blue',
    alignSelf: 'center',
  },
});