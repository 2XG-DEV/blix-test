import { Image, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { AssistantSheet } from "../features/assistant/components/AssistantSheet";

export default function Index() {
  return (
    <View className="flex-1 bg-white">
      {/* Main Content */}
      <View className="items-center justify-center flex-1">
        <Animated.View
          entering={FadeIn.duration(1000)}
          className="items-center"
        >
          <Image
            source={require("../assets/images/partial-react-logo.png")}
            className="w-48 h-48"
            resizeMode="contain"
          />
          <Text className="text-2xl font-bold text-gray-800">
            Welcome to Blix
          </Text>
          <Text className="mt-2 text-lg text-gray-600">
            Ask me anything to get started.
          </Text>
        </Animated.View>
      </View>

      {/* Assistant Sheet */}
      <AssistantSheet />
    </View>
  );
}
