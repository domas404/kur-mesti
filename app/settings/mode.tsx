import { View, Text } from "react-native";
import { Stack } from "expo-router";

export default function Report() {
    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Programos režimas'
                }}
            />
            <View>
                <Text>Programos režimas</Text>
            </View>
        </>
    );
}