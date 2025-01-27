import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";

export function useWidget() {
    
    const [widgetVisibility, setWidgetVisibility] = useState<boolean | undefined>(undefined);

    const updateWidgetVisibility = useCallback(async (visibility: boolean) => {
        setWidgetVisibility(visibility);
        await AsyncStorage.setItem('scheduleWidgetVisibility', JSON.stringify(visibility));
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