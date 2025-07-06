import {
  Canvas,
  Group,
  Circle,
  Image,
  useImage,
  Paint,
  LinearGradient,
} from '@shopify/react-native-skia';
import { Dimensions, View } from 'react-native';
import { PhotoFilterProps } from '../../types/PhotoFilter';
import { photoFilterStyles } from './PhotoFilter.styles';

// function FilteredPhoto({ uri, width, height }) {
export const PhotoFilter: React.FC<PhotoFilterProps> = ({ photo }) => {
  const screenWidth = Dimensions.get('window').width;

  const width = 256;
  const height = 256;
  const r = width * 0.33;

  const image1 = useImage(require('../../assets/nickyphillips.png'));
  // const image3 = useImage({ uri: photo});
  // Loads an image from the network
  // const image2 = useImage("https://picsum.photos/200/300");

  const texture = useImage(require('../../assets/TakeAPicTemp.png')); // texture overlay

  const VignetteOverlay = () => (
    <Paint blendMode="multiply">
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: screenWidth, y: 256 }}
        colors={['rgba(0,0,0,0.7)', 'transparent', 'rgba(0,0,0,0.7)']}
      />
    </Paint>
  );

  const ColorGradingMatrix = [
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
  ];

  const HighPassFilter = ({ image }) => {
    // Emulate a simple high-pass filter with contrast boost
    return (
      <Group>
        <Image
          image={image}
          fit="contain"
          x={0}
          y={0}
          width={screenWidth}
          height={256}
          colorMatrix={ColorGradingMatrix}
        />
      </Group>
    );
  };

  return (
    <>
      <View style={photoFilterStyles.imageContainer}>
        <Canvas style={photoFilterStyles.fullImage}>
          {/* Baroque-style color graded and sharpened base image */}
          {image1 && <HighPassFilter image={image1} />}

          {/* Vignette overlay for chiaroscuro effect */}
          <VignetteOverlay />

          {/* Texture overlay for oil painting effect */}
          {texture && (
            <Image
              image={texture}
              fit="cover"
              x={0}
              y={0}
              width={screenWidth}
              height={256}
              opacity={0.25}
              blendMode="overlay"
            />
          )}
        </Canvas>
        {/* <Canvas style={photoFilterStyles.fullImage}>
          <Image
            image={image1}
            fit="contain"
            x={0}
            y={0}
            width={screenWidth}
            height={256}
          />
        </Canvas> */}
      </View>
      <Canvas style={{ width, height }}>
        <Group blendMode="multiply">
          <Circle cx={r} cy={r} r={r} color="cyan" />
          <Circle cx={width - r} cy={r} r={r} color="magenta" />
          <Circle cx={width / 2} cy={width - r} r={r} color="yellow" />
        </Group>
      </Canvas>
    </>
  );
};
