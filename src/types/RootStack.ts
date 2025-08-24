import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PhotoFile } from "react-native-vision-camera";

export type RootStackParamList = {
  Home: undefined;
  Camera: {
    staffMember: string;
    name: string;
    email: string;
    event: string;
    isPastAudience: boolean | null;
   } | undefined;
  Album: { newPhoto: PhotoFile;
    staffMember: string;
    name: string;
    email: string;
    event: string;
    isPastAudience: boolean | null;
   } | undefined;
};

export type CameraScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Camera'>;
export type CameraScreenRouteProp = RouteProp<RootStackParamList, 'Camera'>;
export type AlbumScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Album'>;
export type AlbumScreenRouteProp = RouteProp<RootStackParamList, 'Album'>;
