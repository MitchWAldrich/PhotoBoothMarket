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
  Skia,
  Shader,
  ImageShader,
  Fill,
  Rect,
  SkImage,
  useCanvasRef,
} from '@shopify/react-native-skia';
import { Dimensions, Text, View } from 'react-native';
import { PhotoFilterProps, PhotoFilterRef } from '../../types/PhotoFilter';
import { photoFilterStyles } from './PhotoFilter.styles';
import { forwardRef, useImperativeHandle, useEffect, useState } from 'react';
import brushStrokes from '../../assets/brushstrokes';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import RNFS from 'react-native-fs';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { Buffer } from 'buffer';

// function FilteredPhoto({ uri, width, height }) {
export const PhotoFilter = forwardRef<PhotoFilterRef, PhotoFilterProps>(
  ({ orientation, photo, path }, ref) => {
    const { width: screenWidth, height: screenHeight } =
      Dimensions.get('window');
    const tabBarHeight = useBottomTabBarHeight();

    const [isReady, setIsReady] = useState<boolean>(false);

    const canvasRef = useCanvasRef();

    const saveFilteredImageFromSkImage = async (
      skImage: SkImage,
    ): Promise<void> => {
      try {
        // Get PNG bytes from SkImage
        const pngBytes = skImage.encodeToBytes(); // Returns Uint8Array

        if (!pngBytes) {
          throw new Error('Failed to encode SkImage to bytes');
        }

        // Convert Uint8Array to base64 string
        const base64 = Buffer.from(pngBytes).toString('base64');

        // Write base64 string to a temporary file
        const filePath = `${
          RNFS.CachesDirectoryPath
        }/filtered_${Date.now()}.png`;
        await RNFS.writeFile(filePath, base64, 'base64');

        // Save file to camera roll
        await CameraRoll.saveAsset(filePath, { type: 'photo' });

        console.log('Filtered photo saved successfully:', filePath);
      } catch (error) {
        console.error('Failed to save filtered photo:', error);
        throw error;
      }
    };

    useImperativeHandle(ref, () => ({
      save: () => {
        const skImage = canvasRef.current?.makeImageSnapshot();
        if (skImage) {
          console.log('Calling save from parent');
          saveFilteredImageFromSkImage(skImage); // Or pass a callback if needed
        } else {
          console.log('no skImage');
        }
      },
    }));

    const texture = useImage(require('../../assets/bar2.jpg')); // texture overlay

    useEffect(() => {
      if (photo && texture) {
        setIsReady(true);
      }
    }, [photo, texture]);

    if (!photo) return;
    const temp = photo;

    const calculatedWidth = photo?.width() ?? 0;
    const calculatedHeight = photo?.height() ?? 0;

    // Calculate scale to fit screen
    const scaleX =
      (orientation === 'portrait' ? screenWidth * 0.95 : screenWidth * 0.8) /
      calculatedWidth;
    const scaleY =
      (orientation === 'portrait' ? screenHeight * 0.8 : screenHeight * 0.95) /
      calculatedHeight;
    const scale = Math.min(scaleX, scaleY); // To maintain aspect ratio

    const imageWidth = calculatedWidth * scale;
    const imageHeight = calculatedHeight * scale;

    // Optional: center the image
    const offsetX = (screenWidth - imageWidth) / 2;
    const offsetY = ((screenHeight - tabBarHeight) * 0.8 - imageHeight) / 2;
    const allAssetsLoaded = photo && texture && path;

    // Create the RuntimeEffect
    const runtimeEffect = Skia.RuntimeEffect.Make(brushStrokes);

    if (!runtimeEffect) {
      return (
        <View>
          <Text>Failed to create shader effect</Text>
        </View>
      );
    }

    if (!allAssetsLoaded) {
      return (
        <Canvas style={photoFilterStyles.imageContainer}>
          <Image
            image={temp}
            // fit="contain"
            x={offsetX}
            y={offsetY}
            width={imageWidth}
            height={imageHeight}
          />
        </Canvas>
      );
    }

    return (
      <>
        <Canvas ref={canvasRef} style={photoFilterStyles.imageContainer}>
          {/* Baroque-style color graded and sharpened base image */}
          {photo && (
            <Group>
              <Fill>
                <Shader
                  source={runtimeEffect}
                  uniforms={{
                    u_Radius: 12,
                    u_Seed: 42,
                    u_Width: imageWidth,
                    u_Height: imageHeight,
                  }}
                >
                  <ImageShader
                    image={photo}
                    fit="contain"
                    rect={{
                      x: offsetX,
                      y: offsetY,
                      width: imageWidth,
                      height: imageHeight,
                    }}
                  />
                </Shader>
              </Fill>
              <ColorMatrix
                matrix={[
                  // R, G, B, A matrix to warm highlights and cool shadows
                  0.95,
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
              <Shadow dx={15} dy={15} blur={20} color="#3a2a1a" />

              {/* Vignette effect (radial gradient) */}
              <Rect
                x={offsetX}
                y={offsetY}
                width={imageWidth}
                height={imageHeight}
                style="stroke"
                strokeWidth={26}
              >
                <LinearGradient
                  start={vec(offsetX, offsetY)}
                  end={vec(offsetX + imageWidth, offsetY + imageHeight)}
                  colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.85)']}
                />
              </Rect>
              {/* <RoundedRect
              x={offsetX + border / 2}
              y={offsetY + border / 2}
              width={imageWidth - border}
              height={imageHeight - border}
              r={24}
              style="stroke"
              strokeWidth={border}
            >
              <LinearGradient
                start={vec(offsetX, offsetY)}
                end={vec(offsetX + imageWidth, offsetY + imageHeight)}
                colors={['rgba(0,0,0,0.75)', 'rgba(0,0,0,0.75)']}
              />
            </RoundedRect> */}

              {/* Main frame rectangle */}
              {
                <Path path={path} strokeWidth={16} style="stroke">
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
        </Canvas>
      </>
    );
  },
);

//NEXT: IMPORT PHOTO (will speed things up too!)
