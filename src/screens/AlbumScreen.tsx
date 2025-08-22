import {
  SafeAreaView,
  View,
  Button,
  Platform,
  PermissionsAndroid,
  Dimensions,
  Alert,
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
import axios from 'axios';
import UserFields from '../components/UserFields/UserFields';
import CustomButton from '../components/Button/Button';

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

  const [isModalVisible, setIsModalVisible] = useState<boolean>(
    route.params &&
      (route.params.name !== 'backup' ||
        route.params.email !== 'backup@email.com')
      ? false
      : true,
  );

  const [staffName, setStaffName] = useState<string>(
    route?.params?.staffMember ?? '',
  );
  const [userName, setUserName] = useState<string>(route?.params?.name ?? '');
  const [userEmail, setUserEmail] = useState<string>(
    route?.params?.email ?? '',
  );
  const [userEvent, setUserEvent] = useState<string>(
    route?.params?.event ?? '',
  );
  const [userIsPastAudience, setUserIsPastAUdience] = useState<boolean | null>(
    route?.params?.isPastAudience ?? null,
  );
  const [hasImage, setHasImage] = useState<boolean>(
    route?.params?.newPhoto ? true : false,
  );

  const getUserValues = (
    staffMember: string,
    name: string,
    email: string,
    event: string,
    isPastAudience: boolean | null,
  ) => {
    console.log('callbackReceived');
    setStaffName(staffMember);
    setUserName(name);
    setUserEmail(email);
    setUserEvent(event);
    setUserIsPastAUdience(isPastAudience);
    setIsModalVisible(false);
  };

  // const newPhoto = route?.params?.newPhoto

  // const { newPhoto, name, email, event, isPastAudience } =
  //   route?.params ?? takeAPic;

  const tabBarHeight = useBottomTabBarHeight();

  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  const [isButtonPressed, setIsButtonPressed] = useState<boolean>(false);
  const [newPhoto, setNewPhoto] = useState<PhotoFile>(
    route?.params?.newPhoto ?? takeAPic,
  );
  const [photos, setPhotos] = useState<PhotoFileWithID[]>([]);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [framePath, setFramePath] = useState<AnimatedProp<PathDef>>('');

  const photoFilterRef = useRef<PhotoFilterRef>(null);

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

  const newPhotoImage = useImage(`file://${newPhoto?.path}`);

  const handleCreateUserWithImage = async () => {
    if (
      !staffName.trim() ||
      !userName.trim() ||
      !userEmail.trim() ||
      !userEvent.trim() ||
      userIsPastAudience ||
      newPhotoImage ||
      photoFilterRef.current
    ) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    axios
      .post('http://10.0.2.2:3000/client-info', {
        staffMember: staffName,
        name: userName,
        email: userEmail,
        event: userEvent,
        isPastAudience: userIsPastAudience,
        originalImage: newPhotoImage,
        baroqueImage: photoFilterRef.current,
      })
      .then(res => {
        console.log(res.data.response || 'POST success!');
      })
      .catch(err => {
        console.error('POST error:', err);
      });

    //   try {
    //     // 1. Fetch the user (e.g., by email or ID)
    //     const getUserResponse = await axios.get(
    //       `http://10.0.2.2:3000/client-info`,
    //       {
    //         params: { email: email }, // or any identifier
    //       },
    //     );

    //     const user = getUserResponse.data;

    //     if (!user || !user.id) {
    //       console.warn('User not found');
    //       return;
    //     }

    //     // 2. Prepare FormData to update the user with the image
    //     const formData = new FormData();
    //     formData.append('name', client);
    //     formData.append('event', event);
    //     formData.append('isPastAudience', isPastAudience);

    //     // Append the image
    //     formData.append('image', {
    //       uri: imageUri, // from image picker
    //       name: 'profile.jpg',
    //       type: 'image/jpeg',
    //     });

    //     // 3. Send PUT or PATCH request to update the user
    //     const updateResponse = await axios.put(
    //       `http://10.0.2.2:3000/client-info/${user.id}`, // assuming RESTful route
    //       formData,
    //       {
    //         headers: {
    //           'Content-Type': 'multipart/form-data',
    //         },
    //       },
    //     );

    //     setPostResponse(
    //       updateResponse.data.response || 'User updated successfully!',
    //     );
    //   } catch (error) {
    //     console.error('Update error:', error);
    //   }
  };

  const handleSaveUnfiltered = async () => {
    console.log('Saved to Camera Roll');

    await CameraRoll.saveAsset(newPhoto.path, { type: 'photo' });
  };

  const handleSaveFiltered = async () => {
    if (isFiltered) {
      photoFilterRef.current?.save();
    }
  };

  const image1 = useImage(require('../assets/market2.jpg'));
  const newPhotoOrientation = newPhoto?.orientation ?? 'portrait';

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

  const handleOpenUserFields = () => {};

  const handleToggleCamera = (openState: boolean) => {
    setIsButtonPressed(openState);
  };

  const applyOperaAtelierTwist = () => {
    setIsFiltered(!isFiltered);
    setIsLoading(true);
  };

  return (
    <SafeAreaView style={albumScreenStyles.container}>
      <UserFields
        callback={getUserValues}
        hasImage={hasImage}
        modalVisibility={isModalVisible}
      />
      <View style={albumScreenStyles.imageContainer}>
        {isFiltered ? (
          <PhotoFilter
            ref={photoFilterRef}
            onSave={handleSaveFiltered}
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
        <CustomButton
          onPress={applyOperaAtelierTwist}
          title={
            isFiltered
              ? 'Revert to the Original Photo'
              : 'The Opera Atelier Twist'
          }
          color1="gold"
          color2="gold"
        />
        <View style={albumScreenStyles.innerButtons}>
          <View style={albumScreenStyles.stackedInnerButtons}>
            <CustomButton
              onPress={handleSaveFiltered}
              title="Save Original"
              color1="teal"
              color2="teal"
            />
            <View style={albumScreenStyles.spacerHeight} />
            <CustomButton
              onPress={handleSaveUnfiltered}
              title="Save Filtered"
              color1="teal"
              color2="teal"
            />
          </View>
          <CustomButton
            onPress={handleCreateUserWithImage}
            title="Save to Database"
            color1="teal"
            color2="teal"
          />
        </View>
        <View style={albumScreenStyles.innerButtons}>
          <CustomButton
            onPress={() => navigation.navigate('Camera')}
            title="Take another picture"
            color1="teal"
            color2="teal"
          />
          <View style={albumScreenStyles.spacerWidth} />
          <CustomButton
            onPress={handleOpenUserFields}
            title="Get user details"
            color1="gold"
            color2="gold"
          />
        </View>
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
