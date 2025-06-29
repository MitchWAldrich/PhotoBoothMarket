import { PhotoFile } from "react-native-vision-camera";

export interface CameraComponentProps {
  pressed: boolean;
  toggleCamera: (openState: boolean,
      photograph?: PhotoFile | null,) => void;
}