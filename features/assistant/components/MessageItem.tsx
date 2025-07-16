import React from "react";
import { Text, View } from "react-native";
import { Message } from "../types";
import { FollowUpButton } from "./FollowUpButton";

interface MessageItemProps {
  message: Message;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isUser = message.sender === "user";

  return (
    <View className={`flex-col mb-4 ${isUser ? "items-end" : "items-start"}`}>
      <View
        className={`p-3 rounded-lg max-w-[80%] ${
          isUser ? "bg-blue-500" : "bg-gray-200"
        }`}
      >
        <Text className={isUser ? "text-white" : "text-black"}>
          {message.text}
        </Text>
      </View>
      {message.followUpQuestions && (
        <View className="flex-row flex-wrap mt-2">
          {message.followUpQuestions.map((q) => (
            <FollowUpButton key={q} question={q} />
          ))}
        </View>
      )}
    </View>
  );
};
