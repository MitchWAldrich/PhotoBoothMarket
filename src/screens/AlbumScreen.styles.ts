import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const albumScreenStyles = StyleSheet.create({
  bottomButtons: {
    flex: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  }, 
  // buttons: {
  //   flexDirection: 'row'
  // },
  container: {
    flex: 1,
    // width: width,
    // height: height,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#fff',
  },
  // innerContainer: {
  //     flex: 8,
  //     width: width,
  //     height: height * .8,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     backgroundColor: '#fff',
  //   },
  imageContainer: {
    flex: 8,
    backgroundColor: 'blue',
  },
  // imageThumbnail: {
  //   width: 100,
  //   height: 100,
  //   borderRadius: 8,
  //   margin: 5,
  //   resizeMode: 'cover',
  // },
  fullImage: {
    width: '100%',
    height: '100%',
    // resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
});