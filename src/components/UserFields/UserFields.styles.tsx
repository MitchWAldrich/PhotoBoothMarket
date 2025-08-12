import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const userFieldsStyles = StyleSheet.create({
  bottomButtons: {
    height: height * 0.05,

    flexDirection: 'row',
  },
  buttons: {
    flexDirection: 'row',
  },
  closeText: {
    marginTop: 15,
    textAlign: 'center',
    color: 'red',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    width: width,
    height: height * 0.95,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },

  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
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
