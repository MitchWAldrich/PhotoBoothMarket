import { SkImage } from "@shopify/react-native-skia";
import { PhotoFile } from "react-native-vision-camera";

export interface PhotoFilterProps {
  photo?: PhotoFile | SkImage | null;
}
