import { Stack } from "expo-router";

export default function SettingsLayout() {
    return (
        <Stack>
            <Stack.Screen
                name={'index'}
            />
            <Stack.Screen
                name={'theme'}
            />
            <Stack.Screen
                name={'schedule/index'}
            />
            <Stack.Screen
                name={'mode'}
            />
            <Stack.Screen
                name={'report'}
            />
            <Stack.Screen
                name={'sources'}
            />
            <Stack.Screen
                name={'donate'}
            />
            <Stack.Screen
                name={'about'}
            />
        </Stack>
    );
}