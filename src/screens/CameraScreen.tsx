import {
  SafeAreaView,
  View,
  Button,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { PhotoFilter } from '../components/PhotoFilter/PhotoFilter';
import CameraComponent from '../components/Camera/Camera';
import ImageScroller from '../components/ImageScroller/ImageScroller';
import { cameraScreenStyles } from './CameraScreen.styles';
import { PhotoFile } from 'react-native-vision-camera';
import { useState } from 'react';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { PhotoFileWithID } from '../types/PhotoFileWithID';
import { mockPhotoFiles } from '../mocks/photofiles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/RootStack';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Camera'
>;
const CameraScreen: React.FC = () => {
  const takeAPic: PhotoFile | (() => PhotoFile) = {
    path: '../assets/TakeAPicTemp.png',
    width: 1080,
    height: 1920,
    isRawPhoto: true,
    orientation: 'portrait',
    isMirrored: false,
  };

  const navigation = useNavigation<HomeScreenNavigationProp>();

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

  return (
    <SafeAreaView style={cameraScreenStyles.container}>
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
          <View style={cameraScreenStyles.imageContainer}>
            <Image
              source={
                photo === takeAPic
                  ? {
                      uri: `file://${photo.path}`,
                    }
                  : require('../assets/TakeAPicTemp.png')
              }
              style={cameraScreenStyles.fullImage}
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
      <Button title="Go Home" onPress={() => navigation.navigate('Home')} />
    </SafeAreaView>
  );
};

export default CameraScreen;
