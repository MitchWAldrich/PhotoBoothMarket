import React from 'react';
import { Image, View } from 'react-native';
import { PhotoFilterProps } from '../../types/PhotoFilter';
import { photoFilterStyles } from './PhotoFilter.styles';

export const PhotoFilter: React.FC<PhotoFilterProps> = () => {
  return (
    <View style={photoFilterStyles.container}>
      <Image />
    </View>
  );
};

export default PhotoFilter;
