import { View, Text } from "react-native";
import { Stack } from "expo-router";

export default function Report() {
    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Pranešti apie klaidą'
                }}
            />
            <View>
                <Text>Pranešti apie klaidą</Text>
            </View>
        </>
    )
}