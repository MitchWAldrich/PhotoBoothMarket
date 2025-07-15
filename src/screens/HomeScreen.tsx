import {
  SafeAreaView,
  Text,
  TextInput,
  Button,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';
import { homeScreenStyles } from './HomeScreen.styles';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/RootStack';
import axios from 'axios';

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

  const handlePostRequest = () => {
    axios
      .post('http://10.0.2.2:3000/client-info', {
        name: client,
        email: clientEmail,
        event: event,
        isPastAudience,
      })
      .then(res => {
        setPostResponse(res.data.response || 'POST success!');
      })
      .catch(err => {
        console.error('POST error:', err);
      });
  };

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={homeScreenStyles.container}>
      <Text style={homeScreenStyles.title}>{event} Photobooth</Text>
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
      <Text style={homeScreenStyles.title}>
        Have you seen an Opera Atelier Show before?
      </Text>
      <View style={homeScreenStyles.buttons}>
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
      <Text style={homeScreenStyles.title}>Ready to submit?</Text>
      <Button
        onPress={handlePostRequest}
        title="Submit"
        color="#841584"
        accessibilityLabel="This button sends client data to the back end"
      />
      {postResponse !== '' && (
        <>
          <Text style={homeScreenStyles.title}>Response from POST:</Text>
          <Text>{postResponse}</Text>
        </>
      )}

      {/* <ImageScroller images={photos ?? mockPhotoFiles} />
       */}
      {/* <ImageScroller images={mockPhotoFiles} /> */}

      <View style={homeScreenStyles.bottomButtons}>
        <Button
          title="Take a picture"
          onPress={() => navigation.navigate('Camera')}
        />
        <Button
          title="Go to Album"
          onPress={() => navigation.navigate('Album')}
        />
      </View>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    </SafeAreaView>
  );
};

export default HomeScreen;
