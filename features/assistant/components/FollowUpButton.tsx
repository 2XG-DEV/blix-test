import React from "react";
import { Pressable, Text } from "react-native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { addUserMessage, submitQuestion } from "../state/assistantSlice";

interface FollowUpButtonProps {
  question: string;
}

export const FollowUpButton: React.FC<FollowUpButtonProps> = ({ question }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handlePress = () => {
    const userMessage = {
      id: `user-${Date.now()}`,
      text: question,
      sender: "user" as const,
    };
    dispatch(addUserMessage(userMessage));
    dispatch(submitQuestion(question));
  };

  return (
    <Pressable
      onPress={handlePress}
      className="bg-blue-100 rounded-full px-4 py-2 mt-2 mr-2"
    >
      <Text className="text-blue-800">{question}</Text>
    </Pressable>
  );
};
