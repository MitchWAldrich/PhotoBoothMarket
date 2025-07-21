import React from 'react';
import {
  Canvas,
  Group,
  Image,
  Path,
  Skia,
  useImage,
} from '@shopify/react-native-skia';
import { Dimensions } from 'react-native';

const AtelierTwist: React.FC = () => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  const pathString = `M10,0
  C5,5,5,15,0,20
  C8,18,12,12,20,10
  C15,12,12,18,10,20`;
  const path = Skia.Path.MakeFromSVGString(pathString);

  const image1 = useImage(require('../../assets/PhotoBooth.png'));

  if (!image1 || !path) return null;

  const calculatedWidth = image1.width();
  const calculatedHeight = image1.height();

  // Calculate scale to fit screen
  const scaleX = screenWidth / calculatedWidth;
  const scaleY = (screenHeight * 0.8) / calculatedHeight;
  const scale = Math.min(scaleX, scaleY); // To maintain aspect ratio

  const imageWidth = calculatedWidth * scale;
  const imageHeight = calculatedHeight * scale;

  return (
    <Canvas style={{ flex: 1 }}>
      <Group>
        <Image
          image={image1}
          // fit="contain"
          x={0}
          y={0}
          width={imageWidth}
          height={imageHeight}
        />
      </Group>
      <Path
        path={path}
        color="gold"
        style="stroke"
        strokeWidth={4}
        start={0}
        end={0}
        strokeJoin="round"
        strokeCap="round"
      />
    </Canvas>
  );
};

export default AtelierTwist;
