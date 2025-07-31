import { StyleSheet } from 'react-native';

export const albumScreenStyles = StyleSheet.create({
  bottomButtons: {
    flex: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  }, 
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 8,
    backgroundColor: 'blue',
  },
  innerImage: {
    flex: 1,
    width: '100%',
    backgroundColor: 'grey',
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
});