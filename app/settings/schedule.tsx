import { View, Text } from "react-native";
import { Stack } from "expo-router";

export default function Schedule() {
    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Atliekų išvežimo grafikas'
                }}
            />
            <View>
                <Text>Atliekų išvežimo grafikas</Text>
            </View>
        </>
    )
}