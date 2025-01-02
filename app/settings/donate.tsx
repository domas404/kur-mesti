import { View, Text } from "react-native";
import { Stack } from "expo-router";

export default function Donate() {
    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Paremti'
                }}
            />
            <View>
                <Text>Paremti</Text>
            </View>
        </>
    )
}