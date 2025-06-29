/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import React, { useRef, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  Camera,
  CameraPermissionRequestResult,
  useCameraDevice,
} from 'react-native-vision-camera';
import CameraPermissions from './src/components/CameraPermission';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const camera = useRef<Camera>(null);

  const device = useCameraDevice('back');

  // make dynamic to user obj
  const [hasCameraPermission, setHasCameraPermission] =
    useState<CameraPermissionRequestResult>('denied');

  console.log('camera permission', hasCameraPermission);
  if (device == null) return;
  // if (!hasPermission) return <PermissionsPage />
  // if (device == null) return <NoCameraErrorView />

  if (hasCameraPermission === 'granted') {
    const handleCameraPermissionsChange = (
      bool: CameraPermissionRequestResult,
    ) => {
      setHasCameraPermission(bool);
    };

    return (
      <View style={styles.container}>
        <CameraPermissions onChangeCamera={handleCameraPermissionsChange} />
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo={true}
        />
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NewAppScreen templateFileName="App.tsx" />
      </View>
    );
  } else {
    <View style={styles.container}>
      <Text>
        In order to proceed, you will need to grant permission to your Camera!
      </Text>
    </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
