import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import {
  Camera,
  CameraPermissionRequestResult,
  PhotoFile,
  useCameraDevice,
} from 'react-native-vision-camera';
import { CameraComponentProps } from '../types/Camera';
import { cameraStyles } from './camera.styles';
// import { CameraRoll } from '@react-native-camera-roll/camera-roll';

const CameraComponent: React.FC<CameraComponentProps> = ({
  pressed,
  toggleCamera,
}) => {
  //Likely store this permanently in user profile
  const [cameraPermission, setCameraPermission] =
    useState<CameraPermissionRequestResult>();
  const [microphonePermission, setMicrophonePermission] =
    useState<CameraPermissionRequestResult>();
  const [photo, setPhoto] = useState<PhotoFile | null>(null);

  const device = useCameraDevice('back');

  // if (!hasPermission) return <PermissionsPage />

  const camera = useRef<Camera>(null);

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

  const takePhoto = async () => {
    if (camera.current) {
      try {
        const tempPhoto = await camera.current.takePhoto({
          flash: 'off', // or 'on' or 'auto'
        });

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
        <Text style={cameraStyles.title}>
          Camera Permission: {cameraPermission}
        </Text>
        <Text style={cameraStyles.title}>
          Microphone Permission: {microphonePermission}
        </Text>
        <Camera
          ref={camera}
          style={cameraStyles.camera}
          device={device}
          isActive={pressed}
          photo={pressed}
        />
        <TouchableOpacity
          style={cameraStyles.captureButton}
          onPress={takePhoto}
        >
          <View style={cameraStyles.innerCircle} />
        </TouchableOpacity>
        <View style={cameraStyles.button}>
          <Button
            onPress={() => toggleCamera(false, photo)}
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
