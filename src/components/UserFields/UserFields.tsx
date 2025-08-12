import { Text, TextInput, Button, View, Modal } from 'react-native';
import { useState } from 'react';
import { UserFieldsProps } from '../../types/UserFields';
import { userFieldsStyles } from './UserFields.styles';

const UserFields: React.FC<UserFieldsProps> = ({
  callback,
  modalVisibility,
}) => {
  const [client, setClient] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [isPastAudience, setIsPastAudience] = useState<boolean>(false);
  const [event, setEvent] = useState<string>('Market Street');
  const [isModalVisible, setIsModalVisible] =
    useState<boolean>(modalVisibility);

  const handleSubmitUser = () => {
    console.log('callbackClicked');
    callback(client, clientEmail, event, isPastAudience);
    setIsModalVisible(false);
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
              <Button
                title="Yes"
                onPress={() => setIsPastAudience(true)}
                color="#841584"
                accessibilityLabel="Click to confirm that you have seen an Opera Atelier show before"
              />
              <Button
                title="No"
                onPress={() => setIsPastAudience(false)}
                color="#841584"
                accessibilityLabel="Click to confirm that you have not seen an Opera Atelier show before"
              />
            </View>
            <View style={userFieldsStyles.submit}>
              <Button
                onPress={handleSubmitUser}
                title={'Update Photographee'}
                color="#841584"
                accessibilityLabel="This button sends client data to the back end"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UserFields;
