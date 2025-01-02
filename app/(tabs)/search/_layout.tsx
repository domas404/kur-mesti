import { Stack } from "expo-router";

export default function CategoryLayout() {
	// useEffect(() => {
	// 	setTimeout(() => {
	// 		setStatusBarBackgroundColor("white");
	// 		setStatusBarStyle("dark");
	// 		// setBackgroundColorAsync("white");
	// 		// setBorderColorAsync("white");
	// 	}, 0);
	// }, []);

	return (
		<Stack>
			<Stack.Screen
                name="index"
                options={{ headerShown: false }}
            />
			{/* <Stack.Screen
                name="category"
            />
            <Stack.Screen
                name="labeling"
            /> */}
		</Stack>
	);
}