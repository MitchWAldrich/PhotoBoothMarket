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
  useSVG,
  Skia,
  ImageSVG,
  fitbox,
  rect,
} from '@shopify/react-native-skia';
import { Dimensions } from 'react-native';
import { PhotoFilterProps } from '../../types/PhotoFilter';
import { photoFilterStyles } from './PhotoFilter.styles';
import { SVG_PATHS } from '../../assets/SVG_PATHS';
// import { BaroqueVignetteOverlay } from './Filters/BaroqueVignetteOverlay';
// import { BaroqueBrushStrokes } from './Filters/BaroqueBrushStrokes';

// import { BaroqueVignetteOverlay } from './Filters/BaroqueVignetteOverlay';
// import { BaroqueBrushStrokes } from './Filters/BaroqueBrushStrokes';

// function FilteredPhoto({ uri, width, height }) {
export const PhotoFilter: React.FC<PhotoFilterProps> = ({ photo }) => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  const temp = photo;
  console.log('temp', temp);

  const image1 = useImage(require('../../assets/PhotoBooth.png'));
  // Loads an image from the network
  // const image2 = useImage("https://picsum.photos/200/300");

  // const texture = useImage(require('../../assets/baroque.png')); // texture overlay
  const texture = useImage(require('../../assets/bar2.jpg')); // texture overlay
  const frame = useSVG(require('../../assets/corner.svg')); // texture overlay

  const brushStrokes = useImage(require('../../assets/bar3.jpg'));

  if (!image1 || !texture || !brushStrokes || !frame) return null;

  const calculatedWidth = image1.width();
  const calculatedHeight = image1.height();

  // Calculate scale to fit screen
  const scaleX = screenWidth / calculatedWidth;
  const scaleY = (screenHeight * 0.8) / calculatedHeight;
  const scale = Math.min(scaleX, scaleY); // To maintain aspect ratio

  const imageWidth = calculatedWidth * scale;
  const imageHeight = calculatedHeight * scale;

  // Optional: center the image
  const offsetX = (screenWidth - imageWidth) / 2;
  const offsetY = (screenHeight * 0.8 - imageHeight) / 2;

  // Size and position of overlay image (e.g., centered, smaller)
  const textureScale = 0.3; // 30% of screen width
  const textureWidth = screenWidth * textureScale;
  const textureHeight = (texture.height() / texture.width()) * textureWidth;
  console.log('textureH', textureHeight);

  const combinedBR = Skia.Path.Make();

  SVG_PATHS.forEach(d => {
    const p = Skia.Path.MakeFromSVGString(d);
    if (p) {
      console.log('d - yes', d);
      const matrix = Skia.Matrix();

      // Apply transformations
      // matrix.postScale(0.015, 0.015);
      // matrix.postRotate(240); // rotates around origin
      // matrix.postTranslate(0, 0);

      combinedBR.addPath(p, matrix);
    } else {
      console.warn('Failed to create path from:', d);
    }
  });

  const wavyRectangle = `
       M 10 50
      C 20 20, 30 80, 40 50
      C 50 20, 60 80, 70 50
      C 80 20, 90 80, 100 50
      C 110 20, 120 80, 110 50
      V 220
      H 10
      Z
    `;

  // const framePath = `M0 ${
  //   (screenHeight * 0.8 - imageHeight) / 2
  // } H${screenWidth} V${
  //   screenHeight * 0.8 - (screenHeight * 0.8 - imageHeight) / 2
  // } H0 Z`;

  const framePath = `
 M 0 100
  C 23 90, 47 90, 70 100
  C 78 110, 87 110, 95 100 
  C 117 115, 133 110, 155 100
  C 163 110, 172 110, 180 100 
  C 193 90, 207 90, 220 100
  C 228 110, 237 110, 245 100
  C 267 110, 283 110, 305 100
  C 313 110, 322 110, 330 100
  C 353 90, 377 90, 400 100
  
  V 630

  C 377 640, 353 640, 330 630
  C 322 620, 313 620, 305 630
C 267 620, 283 620, 245 630
C 228 620, 237 620, 220 630
C 193 620, 207 620, 180 630
C 163 620, 172 620, 155 630
C 117 620, 133 620, 95 630
C 78 620, 87 620, 70 630
C 23 640, 47 640, 0 630

  H 0 
  Z`;

  const cornerWidth = 256;
  const cornerHeight = 256;
  const cornerSrc = rect(0, 0, frame.width(), frame.height());
  const cornerDst = rect(0, 0, cornerWidth, cornerHeight);

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
            <Path path={framePath} strokeWidth={20} style="stroke">
              <LinearGradient
                start={vec(20, 20)}
                end={vec(320, 440)}
                colors={['#d4af37', '#b8860b', '#8b7500', '#d4af37']}
                positions={[0, 0.4, 0.8, 1]}
              />
              <Shadow dx={2} dy={2} blur={6} color="#7a5e00" />
            </Path>
            {/* {frame && (
              <Path path={wavyRectangle} strokeWidth={20} style="stroke">
                <LinearGradient
                  start={vec(20, 20)}
                  end={vec(320, 440)}
                  colors={['#d4af37', '#b8860b', '#8b7500', '#d4af37']}
                  positions={[0, 0.4, 0.8, 1]}
                />
                <Shadow dx={2} dy={2} blur={6} color="#7a5e00" />
              </Path>
            )} */}
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
