import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const cameraScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: 100,
    width: 100,
    backgroundColor: 'blue',
  },
  imageThumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
    margin: 5,
    resizeMode: 'cover',
  },
  fullImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
});