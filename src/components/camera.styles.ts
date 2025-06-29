import { StyleSheet } from 'react-native';

export const cameraStyles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 0,
  },
  camera: {
    flex: 1, 
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 60,
    left: 0,
  },
  captureButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    borderWidth: 4,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    margin: 10,
  },
  innerCircle: {
    width: 60,
    height: 60,
    backgroundColor: 'black',
    borderRadius: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
});