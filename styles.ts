import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const appStyles = StyleSheet.create({
  container: {
    flex: 1,
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
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
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