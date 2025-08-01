import {
  Canvas,
  Group,
  Image,
  useImage,
  ColorMatrix,
  Paint,
  Path,
  LinearGradient,
  vec,
  Shadow,
  AnimatedProp,
  PathDef,
} from '@shopify/react-native-skia';
import { Dimensions, View, ActivityIndicator } from 'react-native';
import { PhotoFilterProps } from '../../types/PhotoFilter';
import { photoFilterStyles } from './PhotoFilter.styles';
import { useEffect, useState } from 'react';
import { calculateFramePath } from '../../utils/createFramePath';

// import { BaroqueVignetteOverlay } from './Filters/BaroqueVignetteOverlay';
// import { BaroqueBrushStrokes } from './Filters/BaroqueBrushStrokes';

// import { BaroqueVignetteOverlay } from './Filters/BaroqueVignetteOverlay';
// import { BaroqueBrushStrokes } from './Filters/BaroqueBrushStrokes';

// function FilteredPhoto({ uri, width, height }) {
export const PhotoFilter: React.FC<PhotoFilterProps> = ({ photo }) => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  const [framePath, setFramePath] = useState<AnimatedProp<PathDef>>('');
  const [isReady, setIsReady] = useState<boolean>(false);

  const image1 = useImage(require('../../assets/PhotoBooth.png'));
  // Loads an image from the network
  // const image2 = useImage("https://picsum.photos/200/300");

  console.log('isReady?', isReady);
  // const texture = useImage(require('../../assets/baroque.png')); // texture overlay
  const brushStrokes = useImage(require('../../assets/bar3.jpg'));
  const texture = useImage(require('../../assets/bar2.jpg')); // texture overlay
  const calculatedWidth = image1?.width() ?? 0;
  const calculatedHeight = image1?.height() ?? 0;

  // Calculate scale to fit screen
  const scaleX = (screenWidth * 0.95) / calculatedWidth;
  const scaleY = (screenHeight * 0.8) / calculatedHeight;
  const scale = Math.min(scaleX, scaleY); // To maintain aspect ratio

  const imageWidth = calculatedWidth * scale;
  const imageHeight = calculatedHeight * scale;

  // Optional: center the image
  const offsetX = (screenWidth - imageWidth) / 2;
  const offsetY = (screenHeight * 0.8 - imageHeight) / 2;

  // useEffect(() => {
  // Size and position of overlay image (e.g., centered, smaller)
  // const textureScale = 0.3; // 30% of screen width
  // const textureWidth = screenWidth * textureScale;
  // const textureHeight = texture
  //   ? texture.height() / texture.width()
  //   : 0 * textureWidth;
  // console.log('textureH', textureHeight);

  const calculatedPath = calculateFramePath(
    imageWidth,
    imageHeight,
    offsetX,
    offsetY,
  );

  useEffect(() => {
    if (image1 && texture && brushStrokes) {
      setIsReady(true);
    }
  }, [image1, texture, brushStrokes]);

  const temp = photo;
  console.log('temp', temp);

  const allAssetsLoaded = image1 && texture && brushStrokes;

  if (!allAssetsLoaded) {
    return (
      <View style={photoFilterStyles.loaderContainer}>
        <ActivityIndicator size="large" color="#d4af37" />
      </View>
    );
  }

  return (
    <>
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
            <Image
              image={texture}
              x={offsetX}
              y={offsetY}
              width={imageWidth}
              height={imageHeight}
              opacity={0.25}
              blendMode="overlay"
              fit="cover"
            />
            {/* Dark base shadow */}
            <Paint color="#000000" style="fill" />
            {/* Light gradient following the curved shape */}
            <Paint blendMode="multiply">
              {/* Chiaroscuro gradient #1 (left to right) */}
              <LinearGradient
                start={vec(0, 0)}
                end={vec(imageWidth, 0)}
                colors={['rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.0)']}
              />

              {/* Chiaroscuro gradient #2 (top to bottom) */}
              <LinearGradient
                start={vec(0, 0)}
                end={vec(0, imageHeight)}
                colors={['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.0)']}
              />
            </Paint>
            {/* <Shadow dx={15} dy={15} blur={20} color="#3a2a1a" /> */}
            {/* Main frame rectangle */}
            {
              <Path path={calculatedPath} strokeWidth={16} style="stroke">
                <LinearGradient
                  start={vec(20, 20)}
                  end={vec(320, 440)}
                  colors={['#d4af37', '#b8860b', '#8b7500', '#d4af37']}
                  positions={[0, 0.4, 0.8, 1]}
                />
                <Shadow dx={2} dy={2} blur={6} color="#7a5e00" />
              </Path>
            }
          </Group>
        )}
        {/* <BaroqueVignetteOverlay />
            <BaroqueBrushStrokes /> */}
        {/* Probably in the Group? */}
        {/* Texture overlay for oil painting effect */}
        {/* {texture && (
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
        )} */}
      </Canvas>
    </>
  );
};

// C 377 640, 353 640, ${(
//   frameWidthNum *
//   ((100 - cornerCurve * 100) / 100)
// ).toString()} ${bottomFrameCoord}
