import React from "react";
import { Text, View } from "react-native";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";
import { Message } from "../types";
import { FollowUpButton } from "./FollowUpButton";

interface MessageItemProps {
  message: Message;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isUser = message.sender === "user";

  return (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeOutDown}
      className={`flex-col mb-4 px-4 ${isUser ? "items-end" : "items-start"}`}
    >
      <View
        className={`p-3 rounded-2xl max-w-[85%] ${
          isUser ? "bg-blue-600 rounded-br-none" : "bg-gray-200 rounded-bl-none"
        }`}
      >
        <Text className={`text-base ${isUser ? "text-white" : "text-black"}`}>
          {message.text}
        </Text>
      </View>
      {message.followUpQuestions && (
        <View
          className={`flex-row flex-wrap mt-2 ${
            isUser ? "justify-end" : "justify-start"
          }`}
        >
          {message.followUpQuestions.map((q) => (
            <FollowUpButton key={q} question={q} />
          ))}
        </View>
      )}
    </Animated.View>
  );
};
