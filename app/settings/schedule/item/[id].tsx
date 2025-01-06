import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet } from "react-native";


export default function Page() {

    const { id } = useLocalSearchParams();

    return (
        <>
            <Stack.Screen
                options={{
                    title: `${id}`
                }}
            />
            <View>
                
            </View>
        </>
    );
}

const styles = StyleSheet.create({

});