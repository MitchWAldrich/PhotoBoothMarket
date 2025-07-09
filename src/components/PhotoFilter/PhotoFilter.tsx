import {
  Canvas,
  Group,
  Image,
  useImage,
  ColorMatrix,
} from '@shopify/react-native-skia';
import { Dimensions } from 'react-native';
import { PhotoFilterProps } from '../../types/PhotoFilter';
import { photoFilterStyles } from './PhotoFilter.styles';
import { BaroqueVignetteOverlay } from './Filters/BaroqueVignetteOverlay';
import { BaroqueBrushStrokes } from './Filters/BaroqueBrushStrokes';

// function FilteredPhoto({ uri, width, height }) {
export const PhotoFilter: React.FC<PhotoFilterProps> = ({ photo }) => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  // const width = 256;
  // const height = 256;
  // const r = width * 0.33;

  const image1 = useImage(require('../../assets/MaeveandJo.png'));
  // Loads an image from the network
  // const image2 = useImage("https://picsum.photos/200/300");

  const texture = useImage(require('../../assets/baroque.png')); // texture overlay
  if (!image1) return null;

  const calculatedWidth = image1.width();
  const calculatedHeight = image1.height();

  // Calculate scale to fit screen
  const scaleX = screenWidth / calculatedWidth;
  const scaleY = screenHeight / calculatedHeight;
  const scale = Math.min(scaleX, scaleY); // To maintain aspect ratio

  const imageWidth = calculatedWidth * scale;
  const imageHeight = calculatedHeight * scale;

  // Optional: center the image
  const offsetX = (screenWidth - imageWidth) / 2;
  const offsetY = (screenHeight - imageHeight) / 2;

  return (
    <>
      {/* // <View style={photoFilterStyles.container}> */}
      <Canvas style={photoFilterStyles.imageContainer}>
        {/* Baroque-style color graded and sharpened base image */}
        {image1 && (
          <Group>
            <Image
              image={image1}
              // fit="contain"
              x={offsetX}
              y={offsetY}
              width={imageWidth}
              height={imageHeight}
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
        )}

        {/* Vignette overlay for chiaroscuro effect */}
        <BaroqueVignetteOverlay />
        <BaroqueBrushStrokes />

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
    </>
  );
};
