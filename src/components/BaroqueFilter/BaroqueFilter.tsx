import React from 'react';
import { Canvas, Path, Skia } from '@shopify/react-native-skia';

const AtelierTwist = () => {
  const pathString = 'M31.311,83.804 ... Z'; // truncated for brevity
  const path = Skia.Path.MakeFromSVGString(pathString);

  return (
    <Canvas style={{ flex: 1 }}>
      {path && <Path path={path} color="black" style="fill" />}
    </Canvas>
  );
};

export default AtelierTwist;
