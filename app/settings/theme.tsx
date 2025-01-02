import { View, Text } from "react-native";
import { Stack } from "expo-router";

export default function Theme() {
    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Tema'
                }}
            />
            <View>
                <Text>Theme</Text>
            </View>
        </>
    )
}