import React from 'react';
import { View, FlatList, Image } from 'react-native';
import { ImageScrollerProps } from '../../types/imageScroller';
import { imageScrollerStyles } from './ImageScroller.styles';

const ImageScroller: React.FC<ImageScrollerProps> = ({ images }) => {
  return (
    <View style={imageScrollerStyles.container}>
      <FlatList
        data={images}
        keyExtractor={item => item.id}
        horizontal={false}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        inverted
        snapToAlignment="start"
        renderItem={({ item }) => (
          <Image
            source={{ uri: `file://${item.path}` }}
            style={imageScrollerStyles.image}
            resizeMode="cover"
          />
        )}
      />
    </View>
  );
};

export default ImageScroller;
