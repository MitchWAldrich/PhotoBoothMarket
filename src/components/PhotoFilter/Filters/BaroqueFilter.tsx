import {
  ColorMatrix,
  Group,
  Image,
  LinearGradient,
  Paint,
} from '@shopify/react-native-skia';
import { PhotoFilterProps } from '../../../types/PhotoFilter';
import { Dimensions } from 'react-native';

export const BaroqueFilter: React.FC<PhotoFilterProps> = ({}) => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <Group>
      <Image
        image={image}
        fit="contain"
        x={0}
        y={0}
        width={screenWidth}
        height={256}
      >
        <ColorMatrix
          matrix={[
            // R, G, B, A matrix to warm highlights and cool shadows
            1.1,
            0.1,
            0.0,
            0,
            0, // Red channel
            0.05,
            1.05,
            0.0,
            0,
            0, // Green channel
            0.0,
            0.0,
            0.95,
            0,
            0, // Blue channel
            0,
            0,
            0,
            1,
            0,
          ]}
        />
      </Image>
    </Group>
  );
};
