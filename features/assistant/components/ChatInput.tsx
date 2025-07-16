import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { addUserMessage, submitQuestion } from "../state/assistantSlice";

export const ChatInput = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.assistant.status);

  const handleSendMessage = () => {
    if (text.trim().length > 0 && status !== "loading") {
      const userMessage = {
        id: `user-${Date.now()}`,
        text: text.trim(),
        sender: "user" as const,
      };
      dispatch(addUserMessage(userMessage));
      dispatch(submitQuestion(text.trim()));
      setText("");
    }
  };

  return (
    <View className="p-4 border-t border-gray-200">
      <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2">
        <BottomSheetTextInput
          value={text}
          onChangeText={setText}
          placeholder="Type your message..."
          className="flex-1 h-10"
          onSubmitEditing={handleSendMessage}
        />
        <Pressable
          onPress={handleSendMessage}
          disabled={status === "loading" || text.trim().length === 0}
          className={`ml-2 p-2 rounded-full ${
            status === "loading" || text.trim().length === 0
              ? "bg-gray-400"
              : "bg-blue-500"
          }`}
        >
          <Text className="text-white">Send</Text>
        </Pressable>
      </View>
    </View>
  );
};
