import { View, Text } from "react-native";
import { Stack } from "expo-router";

export default function About() {
    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Apie programą'
                }}
            />
            <View>
                <Text>Programos versija: 1.0</Text>
            </View>
        </>
    )
}