import { Canvas, LinearGradient, Paint, vec } from '@shopify/react-native-skia';
import { PhotoFilterProps } from '../../../types/PhotoFilter';
import { Dimensions } from 'react-native';

export const BaroqueVignetteOverlay: React.FC<PhotoFilterProps> = ({}) => {
  const { width, height } = Dimensions.get('window');

  return (
    <Canvas>
      <Paint blendMode="multiply">
        {/* Chiaroscuro gradient #1 (left to right) */}
        <LinearGradient
          start={vec(0, 0)}
          end={vec(width, 0)}
          colors={['rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.0)']}
        />

        {/* Chiaroscuro gradient #2 (top to bottom) */}
        <LinearGradient
          start={vec(0, 0)}
          end={vec(0, height)}
          colors={['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.0)']}
        />
      </Paint>
    </Canvas>
  );
};
