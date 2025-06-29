import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import {
  Camera,
  CameraPermissionRequestResult,
} from 'react-native-vision-camera';
import { CameraPermissionProps } from '../types/CameraPermission';

const CameraPermissions: React.FC<CameraPermissionProps> = ({
  onChangeCamera,
}) => {
  //Likely store this permanently in user profile
  const [cameraPermission, setCameraPermission] =
    useState<CameraPermissionRequestResult>();
  const [microphonePermission, setMicrophonePermission] =
    useState<CameraPermissionRequestResult>();

  useEffect(() => {
    const requestPermissions = async () => {
      const cameraPermissionStatus = await Camera.requestCameraPermission();
      const micPermissionStatus = await Camera.requestMicrophonePermission();

      setCameraPermission(cameraPermissionStatus);
      setMicrophonePermission(micPermissionStatus);
      onChangeCamera(cameraPermissionStatus);
    };

    requestPermissions();
  }, [onChangeCamera]);

  return (
    <View>
      <Text>Camera Permission: {cameraPermission}</Text>
      <Text>Microphone Permission: {microphonePermission}</Text>
    </View>
  );
};

export default CameraPermissions;
