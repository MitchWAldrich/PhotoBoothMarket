import {
  SafeAreaView,
  View,
  Button,
  Platform,
  PermissionsAndroid,
  Image,
} from 'react-native';
import { PhotoFilter } from '../components/PhotoFilter/PhotoFilter';
import ImageScroller from '../components/ImageScroller/ImageScroller';
import { albumScreenStyles } from './AlbumScreen.styles';
import { PhotoFile } from 'react-native-vision-camera';
import { useState } from 'react';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { PhotoFileWithID } from '../types/PhotoFileWithID';
import { mockPhotoFiles } from '../mocks/photofiles';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  AlbumScreenNavigationProp,
  AlbumScreenRouteProp,
} from '../types/RootStack';
import AtelierTwist from '../components/BaroqueFilter/BaroqueFilter';

const AlbumScreen: React.FC = () => {
  const takeAPic: PhotoFile | (() => PhotoFile) = {
    path: '../assets/TakeAPicTemp.png',
    width: 1080,
    height: 1920,
    isRawPhoto: true,
    orientation: 'portrait',
    isMirrored: false,
  };

  const navigation = useNavigation<AlbumScreenNavigationProp>();
  const route = useRoute<AlbumScreenRouteProp>();
  const { newPhoto } = route?.params ?? takeAPic;

  const [isButtonPressed, setIsButtonPressed] = useState<boolean>(false);
  const [photo, setPhoto] = useState<PhotoFile>(takeAPic);
  const [photos, setPhotos] = useState<PhotoFileWithID[]>([]);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);

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

  const applyOperaAtelierTwist = () => {
    setIsFiltered(!isFiltered);
  };

  return (
    <SafeAreaView style={albumScreenStyles.container}>
      <View style={albumScreenStyles.imageContainer}>
        {isFiltered ? (
          <AtelierTwist />
        ) : (
          // <PhotoFilter photo={newPhoto ?? takeAPic} />
          <Image
            source={
              !photo
                ? {
                    uri: `file://${photo.path}`,
                  }
                : require('../assets/PhotoBooth.png')
            }
            style={albumScreenStyles.fullImage}
            resizeMode="cover"
          />
        )}
      </View>
      <View style={albumScreenStyles.bottomButtons}>
        <Button
          onPress={applyOperaAtelierTwist}
          title="The Opera Atelier Twist"
          color="gold"
          accessibilityLabel="This button applies an Opera Atelier style filter to your photo"
        />
        <Button
          onPress={savePicture}
          title="Save Photo"
          color="teal"
          accessibilityLabel="This button saves the photo to your camera roll."
        />
        <Button
          title="Take another picture"
          onPress={() => navigation.navigate('Camera')}
        />
      </View>
    </SafeAreaView>
  );
};

export default AlbumScreen;

// const handlePassPhotos = (photograph: PhotoFile) => {
//   setPhoto(photograph);

//   const newPhotoWithID: PhotoFileWithID = {
//     ...photograph,
//     id: (photos.length + 1).toString(),
//   };

//   setPhotos(storedPhotos => [...storedPhotos, newPhotoWithID]);
// };

// const applyMagicFluteFilter = () => {
//   // code for Magic Flute Filters
// };
