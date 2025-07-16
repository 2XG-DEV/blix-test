import { FlashList } from "@shopify/flash-list";
import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { LoadingIndicator } from "../../../components/LoadingIndicator";
import { RootState } from "../../../store/store";
import { Message } from "../types";
import { MessageItem } from "./MessageItem";

export const MessageList = () => {
  const messages = useSelector((state: RootState) => state.assistant.messages);
  const status = useSelector((state: RootState) => state.assistant.status);
  const listRef = useRef<FlashList<Message>>(null);

  useEffect(() => {
    if (messages.length > 0) {
      listRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <View className="flex-1">
      <FlashList
        ref={listRef}
        data={messages}
        renderItem={({ item }) => <MessageItem message={item} />}
        estimatedItemSize={80}
        keyExtractor={(item) => item.id}
        ListFooterComponent={status === "loading" ? <LoadingIndicator /> : null}
        contentContainerClassName="p-4"
      />
    </View>
  );
};
