import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PhotoFile } from "react-native-vision-camera";

export type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  Album: { newPhoto: PhotoFile} | undefined;
};

export type CameraScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Camera'>;
export type AlbumScreenRouteProp = RouteProp<RootStackParamList, 'Album'>;
export type AlbumScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Album'>;