import {
  SafeAreaView,
  View,
  Button,
  Platform,
  PermissionsAndroid,
  Dimensions,
} from 'react-native';
import { PhotoFilter } from '../components/PhotoFilter/PhotoFilter';
import { albumScreenStyles } from './AlbumScreen.styles';
import { PhotoFile } from 'react-native-vision-camera';
import { useCallback, useRef, useState } from 'react';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { PhotoFileWithID } from '../types/PhotoFileWithID';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  AlbumScreenNavigationProp,
  AlbumScreenRouteProp,
} from '../types/RootStack';
import {
  AnimatedProp,
  Canvas,
  Image,
  PathDef,
  useImage,
} from '@shopify/react-native-skia';
import { calculateFramePath } from '../utils/createFramePath';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { PhotoFilterRef } from '../types/PhotoFilter';

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
  const tabBarHeight = useBottomTabBarHeight();

  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  const [isButtonPressed, setIsButtonPressed] = useState<boolean>(false);
  const [photo, setPhoto] = useState<PhotoFile>(takeAPic);
  const [photos, setPhotos] = useState<PhotoFileWithID[]>([]);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [framePath, setFramePath] = useState<AnimatedProp<PathDef>>('');

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

  const photoFilterRef = useRef<PhotoFilterRef>(null);

  const handleSave = async () => {
    if (isFiltered) {
      photoFilterRef.current?.save();
    } else {
      console.log('save called');

      await CameraRoll.saveAsset(newPhoto.path, { type: 'photo' });
    }
  };

  const image1 = useImage(require('../assets/market2.jpg'));
  const newPhotoImage = useImage(`file://${newPhoto?.path}`);
  const newPhotoOrientation = newPhoto.orientation;

  const calculatedWidth = newPhotoImage?.width() ?? screenWidth;
  const calculatedHeight = newPhotoImage?.height() ?? screenHeight;

  // Calculate scale to fit screen
  const scaleX =
    (newPhotoOrientation === 'portrait'
      ? screenWidth * 0.95
      : screenWidth * 0.8) / calculatedWidth;
  const scaleY =
    (newPhotoOrientation === 'portrait'
      ? screenHeight * 0.8
      : screenHeight * 0.95) / calculatedHeight;
  const scale = Math.min(scaleX, scaleY); // To maintain aspect ratio

  const imageWidth = calculatedWidth * scale;
  const imageHeight = calculatedHeight * scale;

  // Optional: center the image
  const offsetX = (screenWidth - imageWidth) / 2;
  const offsetY = ((screenHeight - tabBarHeight) * 0.8 - imageHeight) / 2;

  useFocusEffect(
    useCallback(() => {
      // Runs when the screen comes into focus
      console.log('Screen is now focused!');
      setFramePath(
        calculateFramePath(imageWidth, imageHeight, offsetX, offsetY),
      );

      return () => {
        // Optional: cleanup when screen is unfocused
        console.log('Screen unfocused');
      };
    }, [imageHeight, imageWidth, offsetX, offsetY]),
  );

  if (!image1) return null;

  const handleToggleCamera = (openState: boolean) => {
    setIsButtonPressed(openState);
  };

  const applyOperaAtelierTwist = () => {
    setIsFiltered(!isFiltered);
    setIsLoading(true);
  };

  return (
    <SafeAreaView style={albumScreenStyles.container}>
      <View style={albumScreenStyles.imageContainer}>
        {isFiltered ? (
          <PhotoFilter
            ref={photoFilterRef}
            onSave={handleSave}
            orientation={newPhotoOrientation ?? 'portrait'}
            photo={newPhotoImage ?? image1}
            path={framePath}
          />
        ) : (
          <Canvas style={albumScreenStyles.innerImage}>
            <Image
              image={newPhotoImage ?? image1}
              x={offsetX}
              y={offsetY}
              width={imageWidth}
              height={imageHeight}
            />
          </Canvas>
        )}
      </View>
      <View style={albumScreenStyles.bottomButtons}>
        <Button
          onPress={applyOperaAtelierTwist}
          title={
            isFiltered
              ? 'Revert to the Original Photo'
              : 'The Opera Atelier Twist'
          }
          color="gold"
          accessibilityLabel="This button applies an Opera Atelier style filter to your photo"
        />
        <Button
          onPress={handleSave}
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

//   setPhotos(storedPhotos => [...storedPhotos, newPhotoWithID]);
// };

// const applyMagicFluteFilter = () => {
//   // code for Magic Flute Filters
// };
