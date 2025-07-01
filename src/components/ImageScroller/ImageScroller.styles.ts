import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');

export const imageScrollerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
  },
  image: {
    width,
    height: 300,
  },
});