import { CameraPermissionRequestResult } from "react-native-vision-camera";

export interface CameraPermissionProps {
  onChangeCamera: (result: CameraPermissionRequestResult) => void;
}