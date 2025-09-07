import {
  SafeAreaView,
  Text,
  TextInput,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';
import { homeScreenStyles } from './HomeScreen.styles';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/RootStack';
import CustomButton from '../components/Button/Button';
import Dropdown from '../components/DropDown/DropDown';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [postResponse, setPostResponse] = useState('');
  const [client, setClient] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [isPastAudience, setIsPastAudience] = useState<boolean>(false);
  const [event, setEvent] = useState<string>('Market Street');
  const [staffMember, setStaffMember] = useState<string>('');
  const [isPressedYes, setIsPressedYes] = useState<boolean>(false);
  const [isPressedNo, setIsPressedNo] = useState<boolean>(false);

  // useEffect(() => {
  //   axios
  //     .get('http://10.0.2.2:3000/')
  //     .then(res => {
  //       setUserMessage(res.data.message);
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });

  //   axios
  //     .post('http://10.0.2.2:3000/', {
  //       name: client,
  //       message: userMessage,
  //     })
  //     .then(res => {
  //       setPostResponse(res.data.response || 'POST success!');
  //     })
  //     .catch(err => {
  //       console.error('POST error:', err);
  //       setPostResponse('POST failed. Check the console.');
  //     });
  // }, [client, userMessage]);

  const handlePastAudience = (button: 'yes' | 'no') => {
    if (button === 'yes') {
      setIsPressedYes(prev => !prev); // toggle yes
    } else {
      setIsPressedNo(prev => !prev); // toggle no
    }
  };

  const handlePostRequest = () => {
    navigation.navigate('Camera', {
      staffMember: staffMember,
      name: client,
      email: clientEmail,
      event: event,
      isPastAudience,
    });
  };

  const isDarkMode = useColorScheme() === 'dark';

  const handleDropdown = (val: string) => {
    setStaffMember(val);
  };

  return (
    <SafeAreaView style={homeScreenStyles.container}>
      <Text style={homeScreenStyles.title}>{event} Photobooth</Text>
      <Text style={homeScreenStyles.title}>Enter Staff Member Name:</Text>
      <Dropdown onSelect={handleDropdown} />
      <Text style={homeScreenStyles.title}>Tell us your name:</Text>
      <TextInput
        style={homeScreenStyles.input}
        onChangeText={setClient}
        value={client}
        placeholder="Name..."
      />
      <Text style={homeScreenStyles.title}>What is your e-mail?</Text>
      <TextInput
        style={homeScreenStyles.input}
        onChangeText={setClientEmail}
        value={clientEmail}
        placeholder="E-mail..."
      />
      <Text style={homeScreenStyles.title}>What is this event?</Text>
      <TextInput
        style={homeScreenStyles.input}
        onChangeText={setEvent}
        value={event}
        placeholder="Name of Event"
      />
      <Text style={homeScreenStyles.title}>
        Have you seen an Opera Atelier Show before?
      </Text>
      <View style={homeScreenStyles.buttons}>
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
      <View style={homeScreenStyles.submit}>
        <CustomButton
          onPress={handlePostRequest}
          title="Submit & Take Photo"
          color1="#841584"
          color2="#841584"
        />
        {postResponse !== '' && (
          <>
            <Text style={homeScreenStyles.title}>Response from POST:</Text>
            <Text>{postResponse}</Text>
          </>
        )}
      </View>

      {/* <ImageScroller images={photos ?? mockPhotoFiles} />
       */}
      {/* <ImageScroller images={mockPhotoFiles} /> */}

      <View style={homeScreenStyles.bottomButtons} />
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    </SafeAreaView>
  );
};

export default HomeScreen;
