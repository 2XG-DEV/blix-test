import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { addUserMessage, submitQuestion } from "../state/assistantSlice";

export const ChatInput = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.assistant.status);
  const isLoading = status === "loading";
  const isInputEmpty = text.trim().length === 0;

  const handleSendMessage = () => {
    if (!isInputEmpty && !isLoading) {
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
    <View className="p-3 border-t border-gray-200 bg-white">
      <View className="flex-row items-center bg-gray-100 rounded-2xl border border-gray-300 p-1">
        <BottomSheetTextInput
          value={text}
          onChangeText={setText}
          placeholder="Ask Blix..."
          className="flex-1 px-3 text-base"
          onSubmitEditing={handleSendMessage}
          editable={!isLoading}
        />
        {!isInputEmpty && (
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <Pressable
              onPress={handleSendMessage}
              disabled={isLoading}
              className={`ml-2 w-9 h-9 items-center justify-center rounded-full transition-colors ${
                isLoading ? "bg-gray-400" : "bg-blue-600"
              }`}
            >
              <Text className="text-white text-lg font-bold">↑</Text>
            </Pressable>
          </Animated.View>
        )}
      </View>
    </View>
  );
};
