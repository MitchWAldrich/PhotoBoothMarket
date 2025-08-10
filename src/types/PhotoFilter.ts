import { AnimatedProp, PathDef, SkImage } from "@shopify/react-native-skia";

export interface PhotoFilterRef {
  save: () => void;
}

export interface PhotoFilterProps {
  onSave?: (skImage: SkImage) => void;
  orientation?: 'portrait' | 'landscape';
  photo?: SkImage | null;
  path?: AnimatedProp<PathDef>;
}
