import { Text, TextInput, View, Modal, Alert } from 'react-native';
import { useState } from 'react';
import { UserFieldsProps } from '../../types/UserFields';
import { userFieldsStyles } from './UserFields.styles';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/RootStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomButton from '../Button/Button';
import Dropdown from '../DropDown/DropDown';

type UserFieldsModalNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Camera'
>;

const UserFields: React.FC<UserFieldsProps> = ({
  callback,
  hasImage,
  modalVisibility,
}) => {
  const navigation = useNavigation<UserFieldsModalNavigationProp>();

  const [staffMember, setStaffMember] = useState<string>('');
  const [client, setClient] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [isPastAudience, setIsPastAudience] = useState<boolean>(false);
  const [event, setEvent] = useState<string>('Market Street');
  const [isModalVisible, setIsModalVisible] =
    useState<boolean>(modalVisibility);
  const [hasTakenImage, setHasTakenImage] = useState<boolean>(hasImage);
  const [isPressedNo, setIsPressedNo] = useState<boolean>(false);
  const [isPressedYes, setIsPressedYes] = useState<boolean>(false);

  const handleSubmitUser = () => {
    if (!client.trim()) {
      Alert.alert('Missing Information', 'Please fill in name.');
      return;
    }
    if (!clientEmail.trim()) {
      Alert.alert('Missing Information', 'Please fill in email.');
      return;
    }
    if (!event.trim()) {
      Alert.alert('Missing Information', 'Please fill in event.');
      return;
    }
    if (isPastAudience === null) {
      Alert.alert(
        'Missing Information',
        'Please answer if you have seen an Opera Atelier Show before.',
      );
      return;
    }
    if (isPressedNo === true && isPressedYes === true) {
      Alert.alert(
        'Too many inputs',
        'Please select only one option (Yes or No).',
      );
      return;
    }

    callback(staffMember, client, clientEmail, event, isPastAudience);
    setIsModalVisible(false);

    navigation.navigate('Camera', {
      staffMember: staffMember,
      name: client,
      email: clientEmail,
      event: event,
      isPastAudience,
    });
  };

  const handlePastAudience = (button: 'yes' | 'no') => {
    if (button === 'yes') {
      console.log('isPressedYes', isPressedYes);
      setIsPastAudience(true);
      setIsPressedYes(prev => !prev); // toggle yes
    } else {
      setIsPastAudience(false);
      setIsPressedNo(prev => !prev); // toggle no
    }
  };

  const handleDropdown = (val: string) => {
    console.log('getValue', val);
    setStaffMember(val);
  };

  return (
    <View style={userFieldsStyles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={userFieldsStyles.modalOverlay}>
          <View style={userFieldsStyles.modalContent}>
            <Text style={userFieldsStyles.title}>Enter Staff Member Name:</Text>
            <Dropdown onSelect={handleDropdown} />
            <Text style={userFieldsStyles.title}>Tell us your name:</Text>
            <TextInput
              style={userFieldsStyles.input}
              onChangeText={setClient}
              value={client}
              placeholder="Name..."
            />
            <Text style={userFieldsStyles.title}>What is your e-mail?</Text>
            <TextInput
              style={userFieldsStyles.input}
              onChangeText={setClientEmail}
              value={clientEmail}
              placeholder="E-mail..."
            />
            <Text style={userFieldsStyles.title}>What is this event?</Text>
            <TextInput
              style={userFieldsStyles.input}
              onChangeText={setEvent}
              value={event}
              placeholder="Name of Event"
            />
            <Text style={userFieldsStyles.title}>
              Have you seen an Opera Atelier Show before?
            </Text>
            <View style={userFieldsStyles.buttons}>
              <CustomButton
                title="Yes"
                onPress={() => handlePastAudience('yes')}
                pressed={isPressedYes}
                color1="#841584"
                color2="#daa520"
              />
              <CustomButton
                title="No"
                onPress={() => handlePastAudience('no')}
                pressed={isPressedNo}
                color1="#841584"
                color2="#daa520"
              />
            </View>
            <View style={userFieldsStyles.submit}>
              {hasImage && (
                <CustomButton
                  onPress={handleSubmitUser}
                  title={'Update Photographee'}
                  color1="#841584"
                  color2="#841584"
                />
              )}
              {!hasImage && (
                <CustomButton
                  onPress={handleSubmitUser}
                  title={'Update Photographee and Take a Picture'}
                  color1="#841584"
                  color2="#841584"
                />
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UserFields;
