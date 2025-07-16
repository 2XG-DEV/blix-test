import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useMemo, useRef } from "react";
import { View } from "react-native";
import { ChatInput } from "./ChatInput";
import { MessageList } from "./MessageList";

const CustomHandle = () => (
  <View className="items-center p-2">
    <View className="w-10 h-1 bg-gray-300 rounded-full" />
  </View>
);

export const AssistantSheet = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["5%", "90%"], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
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
      <BottomSheetView className="flex-1 pb-0">
        <MessageList />
        <ChatInput />
      </BottomSheetView>
    </BottomSheet>
  );
};
