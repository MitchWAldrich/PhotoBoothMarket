/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import React from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  Camera,
  useCameraDevice,
  // useCameraPermission,
} from 'react-native-vision-camera';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  // const { hasPermission, requestPermission } = useCameraPermission();

  const device = useCameraDevice('back');
  if (device == null) return;
  // if (!hasPermission) return <PermissionsPage />
  // if (device == null) return <NoCameraDeviceError />

  return (
    <View style={styles.container}>
      <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NewAppScreen templateFileName="App.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
