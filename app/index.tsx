import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { AssistantSheet } from "../features/assistant/components/AssistantSheet";
import { store } from "../store/store";

export default function Index() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View className="flex-1 bg-white">
          <AssistantSheet />
        </View>
      </GestureHandlerRootView>
    </Provider>
  );
}
