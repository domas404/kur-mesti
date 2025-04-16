import { View, Text, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import SettingsItem from "@/components/settings/SettingsItem";
import { useThemeColor } from "@/hooks/useThemeColor";

const settings = [
    { title: 'Tema', icon: 'sunny-outline', id: 'theme' },
    { title: 'Atliekų išvežimo grafikas', icon: 'calendar-outline', id: 'schedule' },
    // { title: 'Programos režimas', icon: 'options-outline', id: 'mode' },
    // { title: 'Pranešti apie klaidą', icon: 'flag-outline', id: 'report' },
    { title: 'Informacijos šaltiniai', icon: 'book-outline', id: 'sources' },
    // { title: 'Paremti', icon: 'cafe-outline', id: 'donate' },
    { title: 'Apie programą', icon: 'information-circle-outline', id: 'about' }
]

export default function Settings() {

    const mappedSettings = settings.map((item, index) => {
        return <SettingsItem key={`${item.id}-${index}`} icon={item.icon} title={item.title} id={item.id} />
    });

    const { container: backgroundColor, border } = useThemeColor();

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Nustatymai'
                }}
            />
            <View style={[styles.container, {backgroundColor, borderColor: border}]}>
                {mappedSettings}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        margin: 10,
        borderWidth: 1,
    }
});