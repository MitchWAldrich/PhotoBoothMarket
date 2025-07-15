import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import CameraScreen from '../../screens/CameraScreen';
import AlbumScreen from '../../screens/AlbumScreen';

export type RootTabParamList = {
  Home: undefined;
  Album: undefined;
  Camera: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2f95dc',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Album" component={AlbumScreen} />
      <Tab.Screen name="Camera" component={CameraScreen} />
    </Tab.Navigator>
  );
};
