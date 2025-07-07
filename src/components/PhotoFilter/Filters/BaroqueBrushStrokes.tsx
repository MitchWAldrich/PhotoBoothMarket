import { Canvas, Image, useImage } from '@shopify/react-native-skia';
import { PhotoFilterProps } from '../../../types/PhotoFilter';
import { Dimensions } from 'react-native';

export const BaroqueBrushStrokes: React.FC<PhotoFilterProps> = ({}) => {
  const { width, height } = Dimensions.get('window');

  return (
    <Canvas>
      <Image
        image={useImage(require('../../../assets/oilBackground.png'))}
        x={0}
        y={0}
        width={width}
        height={height}
        fit="cover"
        opacity={0.2}
        blendMode="overlay"
      />
    </Canvas>
  );
};
