/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-reanimated';
import React from 'react';
import { useColorScheme, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { BottomTabs } from './src/components/BottomTabs/BottomTabs';
import { appStyles } from './styles';

function App() {
  // const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={appStyles.container}>
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
    </View>
  );
}

export default App;
