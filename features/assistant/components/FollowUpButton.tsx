import React from "react";
import { Pressable, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { addUserMessage, submitQuestion } from "../state/assistantSlice";

interface FollowUpButtonProps {
  question: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const FollowUpButton: React.FC<FollowUpButtonProps> = ({ question }) => {
  const dispatch = useDispatch<AppDispatch>();
  const scale = useSharedValue(1);

  const handlePress = () => {
    const userMessage = {
      id: `user-${Date.now()}`,
      text: question,
      sender: "user" as const,
    };
    dispatch(addUserMessage(userMessage));
    dispatch(submitQuestion(question));
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={() => (scale.value = withSpring(0.95))}
      onPressOut={() => (scale.value = withSpring(1))}
      style={animatedStyle}
      className="bg-gray-100 border border-gray-300 rounded-full px-3 py-2 mt-2 ml-2"
    >
      <Text className="text-gray-800 font-medium">{question}</Text>
    </AnimatedPressable>
  );
};
