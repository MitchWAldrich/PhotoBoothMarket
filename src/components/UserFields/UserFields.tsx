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
  name,
  email,
  isPastAudience,
  event,
  staffMember,
}) => {
  const navigation = useNavigation<UserFieldsModalNavigationProp>();

  const [oaStaffMember, setOaStaffMember] = useState<string>(staffMember ?? '');
  const [client, setClient] = useState<string>(name ?? '');
  const [clientEmail, setClientEmail] = useState<string>(email ?? '');
  const [isOaPastAudience, setIsOaPastAudience] = useState<boolean | null>(
    isPastAudience ?? null,
  );
  const [oaEvent, setOaEvent] = useState<string>(event ?? 'Market Street');
  const [isModalVisible, setIsModalVisible] =
    useState<boolean>(modalVisibility);
  const [isPressedNo, setIsPressedNo] = useState<boolean>(
    isPastAudience === false ? true : false,
  );
  const [isPressedYes, setIsPressedYes] = useState<boolean>(
    isPastAudience === true ? true : false,
  );

  const handleSubmitUser = () => {
    if (!client.trim()) {
      Alert.alert('Missing Information', 'Please fill in name.');
      return;
    }
    if (!clientEmail.trim()) {
      Alert.alert('Missing Information', 'Please fill in email.');
      return;
    }
    if (!oaEvent.trim()) {
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

    callback(oaStaffMember, client, clientEmail, oaEvent, isOaPastAudience);
    setIsModalVisible(false);

    navigation.navigate('Camera', {
      staffMember: oaStaffMember,
      name: client,
      email: clientEmail,
      event: oaEvent,
      isPastAudience: isOaPastAudience,
    });
  };

  const handlePastAudience = (button: 'yes' | 'no') => {
    if (button === 'yes') {
      console.log('isPressedYes', isPressedYes);
      setIsOaPastAudience(true);
      setIsPressedYes(prev => !prev); // toggle yes
    } else {
      setIsOaPastAudience(false);
      setIsPressedNo(prev => !prev); // toggle no
    }
  };

  const handleDropdown = (val: string) => {
    console.log('getValue', val);
    setOaStaffMember(val);
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
              onChangeText={setOaEvent}
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
