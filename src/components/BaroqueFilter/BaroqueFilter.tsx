import React from 'react';
import { Canvas, Path, Skia } from '@shopify/react-native-skia';

const AtelierTwist: React.FC = () => {
  const pathString = `M10,0
  C5,5,5,15,0,20
  C8,18,12,12,20,10
  C15,12,12,18,10,20`;
  const path = Skia.Path.MakeFromSVGString(pathString);

  return (
    <Canvas style={{ flex: 1 }}>
      {path && (
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
      )}
    </Canvas>
  );
};

export default AtelierTwist;
