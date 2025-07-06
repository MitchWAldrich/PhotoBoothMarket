import { StyleSheet } from "react-native";

export const photoFilterStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  fullImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
  },
  imageContainer: {
      height: '40%',
      width: '80%',
      backgroundColor: 'blue',
    },
});