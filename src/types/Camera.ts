import { PhotoFile } from "react-native-vision-camera";

export interface CameraComponentProps {
  passPhoto: (photograph: PhotoFile) => void;
  pressed: boolean;
  toggleCamera: (openState: boolean) => void;
}