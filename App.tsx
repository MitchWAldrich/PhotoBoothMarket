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
  PermissionsAndroid,
  Platform,
  StatusBar,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { appStyles } from './styles';
import CameraComponent from './src/components/Camera/Camera';
import { PhotoFile } from 'react-native-vision-camera';
import ImageScroller from './src/components/ImageScroller/ImageScroller';
import { mockPhotoFiles } from './src/mocks/photofiles';
import { PhotoFileWithID } from './src/types/PhotoFileWithID';
import { PhotoFilter } from './src/components/PhotoFilter/PhotoFilter';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const takeAPic: PhotoFile | (() => PhotoFile) = {
    path: './assets/TakeAPicTemp.png',
    width: 1080,
    height: 1920,
    isRawPhoto: true,
    orientation: 'portrait',
    isMirrored: false,
  };

  const [isButtonPressed, setIsButtonPressed] = useState<boolean>(false);
  const [photo, setPhoto] = useState<PhotoFile>(takeAPic);
  const [photos, setPhotos] = useState<PhotoFileWithID[]>([]);

  const hasAndroidPermission = async () => {
    const getCheckPermissionPromise = () => {
      if (Number(Platform.Version) >= 33) {
        return Promise.all([
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          ),
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          ),
        ]).then(
          ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
            hasReadMediaImagesPermission && hasReadMediaVideoPermission,
        );
      } else {
        return PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
      }
    };

    const hasPermission = await getCheckPermissionPromise();
    if (hasPermission) {
      return true;
    }
    const getRequestPermissionPromise = () => {
      if (Number(Platform.Version) >= 33) {
        return PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]).then(
          statuses =>
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
              PermissionsAndroid.RESULTS.GRANTED,
        );
      } else {
        return PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ).then(status => status === PermissionsAndroid.RESULTS.GRANTED);
      }
    };

    return await getRequestPermissionPromise();
  };

  const savePicture = async () => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }

    if (photo) CameraRoll.saveAsset(photo.path);
  };

  const handleToggleCamera = (openState: boolean) => {
    setIsButtonPressed(openState);
  };

  const handlePassPhotos = (photograph: PhotoFile) => {
    setPhoto(photograph);

    const newPhotoWithID: PhotoFileWithID = {
      ...photograph,
      id: (photos.length + 1).toString(),
    };

    setPhotos(storedPhotos => [...storedPhotos, newPhotoWithID]);
  };

  const applyOperaAtelierTwist = () => {
    // code for Opera Atelier Twist filter
  };

  const applyMagicFluteFilter = () => {
    // code for Magic Flute Filters
  };

  const [client, setClient] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [customSaying, setCustomSaying] = useState<string>('');

  return (
    // <SafeAreaView>
    <View style={appStyles.container}>
      <Text style={appStyles.title}>Tell us your name:</Text>
      <TextInput
        style={appStyles.input}
        onChangeText={setClient}
        value={client}
        placeholder="Name..."
      />
      <Text style={appStyles.title}>What is your e-mail?</Text>
      <TextInput
        style={appStyles.input}
        onChangeText={setClientEmail}
        value={clientEmail}
        placeholder="E-mail..."
      />
      <Text style={appStyles.title}>What goes on your custom sign?</Text>
      <TextInput
        style={appStyles.input}
        onChangeText={setCustomSaying}
        value={customSaying}
        placeholder="E-mail..."
      />
      <Text style={appStyles.title}>Take a photo?</Text>
      <Button
        onPress={() => handleToggleCamera(true)}
        title="Open Camera"
        color="#841584"
        accessibilityLabel="This button launches your phone's camera app"
      />
      <PhotoFilter photo={takeAPic} />
      {isButtonPressed && (
        <CameraComponent
          passPhoto={handlePassPhotos}
          pressed={isButtonPressed}
          toggleCamera={handleToggleCamera}
        />
      )}
      {photo && (
        <>
          <View style={appStyles.imageContainer}>
            <Image
              source={
                photo === takeAPic
                  ? {
                      uri: `file://${photo.path}`,
                    }
                  : require('./src/assets/TakeAPicTemp.png')
              }
              style={appStyles.fullImage}
            />
          </View>
          <Button
            onPress={savePicture}
            title="Save Photo"
            color="teal"
            accessibilityLabel="This button saves the photo to your camera roll."
          />
          <Button
            onPress={applyOperaAtelierTwist}
            title="The Opera Atelier Twist"
            color="gold"
            accessibilityLabel="This button applies an Opera Atelier style filter to your photo"
          />
          <Button
            onPress={applyMagicFluteFilter}
            title="Magic Flute Filter"
            color="red"
            accessibilityLabel="This button applies a Magic Flute filter to your photo"
          />
        </>
      )}
      <ImageScroller images={photos ?? mockPhotoFiles} />
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    </View>
    // </SafeAreaView>
  );
}

export default App;
