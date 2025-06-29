import { StyleSheet } from 'react-native';

export const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
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