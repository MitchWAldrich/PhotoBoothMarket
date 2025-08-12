import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PhotoFile } from "react-native-vision-camera";

export type RootStackParamList = {
  Home: undefined;
  Camera: {
    name: string;
    email: string;
    event: string;
    isPastAudience: boolean;
   } | undefined;
  Album: { newPhoto: PhotoFile;
    name: string;
    email: string;
    event: string;
    isPastAudience: boolean;
   } | undefined;
};

export type CameraScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Camera'>;
export type CameraScreenRouteProp = RouteProp<RootStackParamList, 'Camera'>;
export type AlbumScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Album'>;
export type AlbumScreenRouteProp = RouteProp<RootStackParamList, 'Album'>;
