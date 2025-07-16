import React from "react";
import { ActivityIndicator, View } from "react-native";

export const LoadingIndicator = () => {
  return (
    <View className="flex-row items-center justify-center p-4">
      <ActivityIndicator size="small" color="#0000ff" />
    </View>
  );
};
