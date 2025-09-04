import { AnimatedProp, PathDef, SkImage } from "@shopify/react-native-skia";
import { Orientation } from "react-native-vision-camera";

export interface PhotoFilterRef {
  save: () => void;
}

export interface PhotoFilterProps {
  onSave?: (skImage: SkImage) => void;
  orientation?: Orientation;
  photo?: SkImage | null;
  path?: AnimatedProp<PathDef>;
  offsetX: number;
  offsetY: number;
}
