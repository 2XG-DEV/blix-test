// features/assistant/components/AssistantSheet.tsx
import BottomSheet from "@gorhom/bottom-sheet";
import React, { useMemo, useRef } from "react";
import { View } from "react-native";
import { ChatInput } from "./ChatInput";
import { MessageList } from "./MessageList";

export const AssistantSheet = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "90%"], []); // Collapsed and expanded states

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1} // Start in the expanded state
      snapPoints={snapPoints}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
    >
      <View className="flex-1">
        <MessageList />
        <ChatInput />
      </View>
    </BottomSheet>
  );
};
