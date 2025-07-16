import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface DotProps {
  delay: number;
}

const Dot: React.FC<DotProps> = ({ delay }) => {
  const opacity = useSharedValue(0.5);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, { duration: 600, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      )
    );
  }, [delay, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      className="w-2 h-2 bg-gray-400 rounded-full mx-1"
      style={animatedStyle}
    />
  );
};

export const LoadingIndicator = () => {
  return (
    <View className="flex-row items-center justify-start p-4 pl-6">
      <Dot delay={0} />
      <Dot delay={200} />
      <Dot delay={400} />
    </View>
  );
};
