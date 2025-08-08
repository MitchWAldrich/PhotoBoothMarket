import { StyleSheet } from 'react-native';

export const cameraStyles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 0,
  },
  camera: {
    flex: 1, 
    backgroundColor: 'green',
    width: '100%',
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
    width: '100%',
    height: '100%',
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