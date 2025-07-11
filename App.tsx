/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { useColorScheme } from 'react-native';
import { PhotoFile } from 'react-native-vision-camera';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './src/screens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from './src/screens/CameraScreen';

const Stack = createNativeStackNavigator();

function App() {
  // const isDarkMode = useColorScheme() === 'dark';

  const takeAPic: PhotoFile | (() => PhotoFile) = {
    path: './assets/TakeAPicTemp.png',
    width: 1080,
    height: 1920,
    isRawPhoto: true,
    orientation: 'portrait',
    isMirrored: false,
  };

  // const [isButtonPressed, setIsButtonPressed] = useState<boolean>(false);
  // const [photo, setPhoto] = useState<PhotoFile>(takeAPic);
  // const [photos, setPhotos] = useState<PhotoFileWithID[]>([]);

  // const hasAndroidPermission = async () => {
  //   const getCheckPermissionPromise = () => {
  //     if (Number(Platform.Version) >= 33) {
  //       return Promise.all([
  //         PermissionsAndroid.check(
  //           PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
  //         ),
  //         PermissionsAndroid.check(
  //           PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
  //         ),
  //       ]).then(
  //         ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
  //           hasReadMediaImagesPermission && hasReadMediaVideoPermission,
  //       );
  //     } else {
  //       return PermissionsAndroid.check(
  //         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  //       );
  //     }
  //   };

  //   const hasPermission = await getCheckPermissionPromise();
  //   if (hasPermission) {
  //     return true;
  //   }
  //   const getRequestPermissionPromise = () => {
  //     if (Number(Platform.Version) >= 33) {
  //       return PermissionsAndroid.requestMultiple([
  //         PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
  //         PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
  //       ]).then(
  //         statuses =>
  //           statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
  //             PermissionsAndroid.RESULTS.GRANTED &&
  //           statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
  //             PermissionsAndroid.RESULTS.GRANTED,
  //       );
  //     } else {
  //       return PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  //       ).then(status => status === PermissionsAndroid.RESULTS.GRANTED);
  //     }
  //   };

  //   return await getRequestPermissionPromise();
  // };

  // const handleToggleCamera = (openState: boolean) => {
  //   setIsButtonPressed(openState);
  // };

  // const handlePassPhotos = (photograph: PhotoFile) => {
  //   setPhoto(photograph);

  //   const newPhotoWithID: PhotoFileWithID = {
  //     ...photograph,
  //     id: (photos.length + 1).toString(),
  //   };

  //   setPhotos(storedPhotos => [...storedPhotos, newPhotoWithID]);
  // };

  // const [client, setClient] = useState<string>('');
  // const [clientEmail, setClientEmail] = useState<string>('');
  // const [customSaying, setCustomSaying] = useState<string>('');

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Camera" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
