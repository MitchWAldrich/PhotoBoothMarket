import { StyleSheet } from 'react-native';

export const albumScreenStyles = StyleSheet.create({
  bottomButtons: {
    flex: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
  }, 
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 8,
    backgroundColor: 'red',
  },
  innerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  }, 
  innerImage: {
    flex: 1,
    backgroundColor: 'orange',
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
  spacerHeight: {
    height: 8,
  },
  spacerWidth: {
    width: 12,
  },
  stackedInnerButtons: {
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  titleText: {
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 8,
    padding: 6,
  },
});