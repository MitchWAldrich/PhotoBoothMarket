import React, { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { SubmitButtonProps } from '../../types/Button';
import { buttonStyles } from './Button.styles';

// Create an animated version of Pressable
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const CustomButton: React.FC<SubmitButtonProps> = ({
  color1,
  color2,
  onPress,
  pressed,
  title,
}) => {
  // Reanimated shared values for scale and color
  const scale = useSharedValue<number>(1);
  const bgColor = useSharedValue<string>(pressed ? color2 : color1);

  useEffect(() => {
    bgColor.value = withTiming(pressed ? color2 : color1, {
      duration: 200,
    });
  }, [pressed, color1, color2, bgColor]);

  // Press animation handlers
  const handlePressIn = () => {
    scale.value = withTiming(0.95, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: bgColor.value,
  }));

  return (
    <View style={buttonStyles.submit}>
      <AnimatedPressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        style={[buttonStyles.button, animatedStyle]}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>{title}</Text>
      </AnimatedPressable>
    </View>
  );
};

export default CustomButton;
