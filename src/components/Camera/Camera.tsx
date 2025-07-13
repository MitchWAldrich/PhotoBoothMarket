import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import {
  Camera,
  CameraPermissionRequestResult,
  PhotoFile,
  useCameraDevice,
} from 'react-native-vision-camera';
import { CameraComponentProps } from '../../types/Camera';
import { cameraStyles } from './Camera.styles';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/RootStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PhotoFileWithID } from '../../types/PhotoFileWithID';

type CameraScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Camera'
>;

const takeAPic: PhotoFile | (() => PhotoFile) = {
  path: '../assets/TakeAPicTemp.png',
  width: 1080,
  height: 1920,
  isRawPhoto: true,
  orientation: 'portrait',
  isMirrored: false,
};

const CameraComponent: React.FC<CameraComponentProps> = ({
  passPhoto,
  pressed,
  toggleCamera,
}) => {
  const navigation = useNavigation<CameraScreenNavigationProp>();

  //Likely store this permanently in user profile
  const [cameraPermission, setCameraPermission] =
    useState<CameraPermissionRequestResult>();
  const [microphonePermission, setMicrophonePermission] =
    useState<CameraPermissionRequestResult>();

  const [photo, setPhoto] = useState<PhotoFile>(takeAPic);
  const [photos, setPhotos] = useState<PhotoFileWithID[]>([]);

  const device = useCameraDevice('back');
  // if (!hasPermission) return <PermissionsPage />

  const camera = useRef<Camera>(null);

  useEffect(() => {
    navigation.navigate('Album', {
      newPhoto: photo,
    });
    console.log('****logDurPhoto,');
  }, [navigation, photo]);

  useEffect(() => {
    const requestPermissions = async () => {
      const cameraPermissionStatus = await Camera.requestCameraPermission();
      const micPermissionStatus = await Camera.requestMicrophonePermission();

      setCameraPermission(cameraPermissionStatus);
      setMicrophonePermission(micPermissionStatus);
    };

    requestPermissions();
  }, []);

  if (device == null) return <Text>Loading...</Text>;
  // if (device == null) return <NoCameraErrorView />
  console.log('Current?', camera.current);
  const takePhoto = async () => {
    if (camera.current) {
      try {
        const tempPhoto = await camera.current.takePhoto({
          flash: 'off', // or 'on' or 'auto'
        });

        passPhoto(tempPhoto);
        setPhoto(tempPhoto);
      } catch (error) {
        console.error('Failed to take photo:', error);
      }
      // const multishot = await camera.current?.takeSnapshot({
      //   quality: 90,
      // });

      // await CameraRoll.saveAsset(`file://${file.path}`, {
      //   type: 'photo',
      // });

      // Get photo data
      // const result = await fetch(`file://${file.path}`);
      // const data = await result.blob();
    }
  };
  if (cameraPermission === 'granted') {
    return (
      <View style={cameraStyles.container}>
        {/* <Text style={cameraStyles.title}>
          Camera Permission: {cameraPermission}
        </Text>
        <Text style={cameraStyles.title}>
          Microphone Permission: {microphonePermission}
        </Text> */}
        <Camera
          ref={camera}
          style={cameraStyles.camera}
          device={device}
          isActive={true}
          photo={true}
        />
        <TouchableOpacity
          style={cameraStyles.captureButton}
          onPress={takePhoto}
        >
          <View style={cameraStyles.innerCircle} />
        </TouchableOpacity>
        <View style={cameraStyles.button}>
          <Button
            onPress={() => navigation.navigate('Album')}
            title="Close Camera"
            color="black"
            accessibilityLabel="This button closes your phone's camera app"
          />
        </View>
      </View>
    );
  } else {
    return (
      <View style={cameraStyles.container}>
        <Text>
          In order to proceed, you will need to grant permission to your Camera!
        </Text>
      </View>
    );
  }
};

export default CameraComponent;
