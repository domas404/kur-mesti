import { View, Text } from "react-native";
import { Stack } from "expo-router";

export default function Sources() {
    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Informacijos šaltiniai'
                }}
            />
            <View>
                <Text>Informacijos šaltiniai</Text>
            </View>
        </>
    )
}