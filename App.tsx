/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  Button,
  Image,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { appStyles } from './styles';
import CameraComponent from './src/components/Camera';
import { PhotoFile } from 'react-native-vision-camera';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const [isButtonPressed, setIsButtonPressed] = useState<boolean>(false);
  const [photo, setPhoto] = useState<PhotoFile | null>(null);

  const handleToggleCamera = (
    openState: boolean,
    photograph?: PhotoFile | null,
  ) => {
    if (photograph) setPhoto(photograph);
    setIsButtonPressed(openState);
  };

  return (
    <View style={appStyles.container}>
      <Text style={appStyles.title}>Take a photo?</Text>
      <Button
        onPress={() => handleToggleCamera(true)}
        title="Open Camera"
        color="#841584"
        accessibilityLabel="This button launches your phone's camera app"
      />
      {isButtonPressed && (
        <CameraComponent
          pressed={isButtonPressed}
          toggleCamera={handleToggleCamera}
        />
      )}
      {photo && (
        <View style={appStyles.imageContainer}>
          <Image
            source={{
              uri: `file://${photo.path}`,
            }}
            style={appStyles.fullImage}
          />
        </View>
      )}

      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    </View>
  );
}

export default App;
