import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const homeScreenStyles = StyleSheet.create({
  bottomButtons: {
    height: height * .05,
   
    flexDirection: 'row'
  }, 
  buttons: {
    flexDirection: 'row'
  },
  container: {
    flex: 1,
    width: width,
    height: height * .95,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    height: 50,
    width: '75%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  submit: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
});