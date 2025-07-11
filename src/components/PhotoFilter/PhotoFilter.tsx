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
  Rect,
  ImageSVG,
  useSVG,
  rect,
  fitbox,
  Skia,
  SkSVG,
} from '@shopify/react-native-skia';
import { Dimensions, View } from 'react-native';
import { PhotoFilterProps } from '../../types/PhotoFilter';
import { photoFilterStyles } from './PhotoFilter.styles';
import { useEffect, useState } from 'react';
import RNFS from 'react-native-fs';
import cornerSvg from '../../assets/cornerSVG';
import { SVG_PATHS } from '../../assets/SVG_PATHS';
import { BaroqueVignetteOverlay } from './Filters/BaroqueVignetteOverlay';
import { BaroqueBrushStrokes } from './Filters/BaroqueBrushStrokes';

// import { BaroqueVignetteOverlay } from './Filters/BaroqueVignetteOverlay';
// import { BaroqueBrushStrokes } from './Filters/BaroqueBrushStrokes';

// function FilteredPhoto({ uri, width, height }) {
export const PhotoFilter: React.FC<PhotoFilterProps> = ({ photo }) => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  // const width = 256;
  // const height = 256;
  // const r = width * 0.33;
  const image1 = useImage(require('../../assets/MaeveandJo.png'));
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
  const scaleY = screenHeight / calculatedHeight;
  const scale = Math.min(scaleX, scaleY); // To maintain aspect ratio

  const imageWidth = calculatedWidth * scale;
  const imageHeight = calculatedHeight * scale;

  // Optional: center the image
  const offsetX = (screenWidth - imageWidth) / 2;
  const offsetY = (screenHeight - imageHeight) / 2;

  // Size and position of overlay image (e.g., centered, smaller)
  const textureScale = 0.3; // 30% of screen width
  const textureWidth = screenWidth * textureScale;
  const textureHeight = (texture.height() / texture.width()) * textureWidth;

  const combinedBR = Skia.Path.Make();
  SVG_PATHS.forEach(d => {
    const p = Skia.Path.MakeFromSVGString(d);

    if (p) {
      const matrix = Skia.Matrix();
      matrix.translate(230, 604);
      matrix.scale(0.015, 0.015);
      // matrix.rotate(240);

      combinedBR.addPath(p, matrix);
    } else {
      console.warn('Failed to create path from:', d);
    }
  });

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
            <Path
              path={`M0 ${(screenHeight - imageHeight) / 2} H${screenWidth} V${
                screenHeight - (screenHeight - imageHeight) / 2
              } H0 Z`}
              strokeWidth={20}
              style="stroke"
            >
              <LinearGradient
                start={vec(20, 20)}
                end={vec(320, 440)}
                colors={['#d4af37', '#b8860b', '#8b7500', '#d4af37']}
                positions={[0, 0.4, 0.8, 1]}
              />
              <Shadow dx={2} dy={2} blur={6} color="#7a5e00" />
            </Path>
            <Path
              path={combinedBR}
              style="fill"
              color="#d4af37"
              strokeWidth={10}
            />
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
