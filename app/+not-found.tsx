import { Link, Stack } from "expo-router";
import { Text } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Link href={"/"}>
        <Text>Not found, go home!</Text>
      </Link>
    </>
  );
}
