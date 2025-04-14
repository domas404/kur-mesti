import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function CategoryLayout() {
	return (
		<GestureHandlerRootView>
			<Stack>
				<Stack.Screen
					name="index"
					options={{ headerShown: false }}
				/>
			</Stack>
		</GestureHandlerRootView>
	);
}