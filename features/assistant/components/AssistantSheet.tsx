// features/assistant/components/AssistantSheet.tsx
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useMemo, useRef } from "react";
import { View } from "react-native";
import { ChatInput } from "./ChatInput";
import { MessageList } from "./MessageList";

// A custom handle for the bottom sheet
const CustomHandle = () => (
  <View className="items-center p-2">
    <View className="w-10 h-1 bg-gray-300 rounded-full" />
  </View>
);

export const AssistantSheet = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["5%", "50%", "90%"], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={2}
      snapPoints={snapPoints}
      enableDynamicSizing={true}
      keyboardBehavior="extend"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      handleComponent={CustomHandle}
      backgroundStyle={{
        backgroundColor: "#f8f8f8",
      }}
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: -4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 10,
        borderTopWidth: 1,
        borderTopColor: "#e0e0e0",
      }}
    >
      <BottomSheetView style={{ flex: 1, paddingBottom: 0 }}>
        <MessageList />
        <ChatInput />
      </BottomSheetView>
    </BottomSheet>
  );
};
