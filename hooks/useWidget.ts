import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";
import { ToastAndroid } from "react-native";

export function useWidget() {
    
    const [widgetVisibility, setWidgetVisibility] = useState<boolean | undefined>(undefined);

    const updateWidgetVisibility = useCallback(async (visibility: boolean) => {
        setWidgetVisibility(visibility);
        await AsyncStorage.setItem('scheduleWidgetVisibility', JSON.stringify(visibility));
        ToastAndroid.show(visibility ? 'Grafikas rodomas' : 'Grafikas paslėptas', ToastAndroid.SHORT);
    }, []);

    useFocusEffect(
        useCallback(() => {
            const setupWidgetVisibility = async() => {
                const storedVisibility = await AsyncStorage.getItem('scheduleWidgetVisibility');
                if (storedVisibility) {
                    const visibility = await JSON.parse(storedVisibility);
                    if (visibility !== widgetVisibility)
                        setWidgetVisibility(visibility);
                } else {
                    await AsyncStorage.setItem('scheduleWidgetVisibility', JSON.stringify(true));
                }
            }
            setupWidgetVisibility();
        }, [])
    );

    return {
        widgetVisibility,
        updateWidgetVisibility
    }
}