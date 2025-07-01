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
    console.log('passed?', photograph);
    setPhoto(photograph);

    const newPhotoWithID: PhotoFileWithID = {
      ...photograph,
      id: (photos.length + 1).toString(),
    };

    setPhotos(storedPhotos => [...storedPhotos, newPhotoWithID]);
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
            accessibilityLabel="This button launches your phone's camera app"
          />
        </>
      )}
      <ImageScroller images={photos ?? mockPhotoFiles} />
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    </View>
  );
}

export default App;
