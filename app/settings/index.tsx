import { View, Text, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import SettingsItem from "@/components/SettingsItem";

const settings = [
    { title: 'Tema', icon: 'sunny-outline', id: 'theme' },
    { title: 'Atliekų išvežimo grafikas', icon: 'calendar-outline', id: 'calendar' },
    { title: 'Programos režimas', icon: 'options-outline', id: 'mode' },
    { title: 'Pranešti apie klaidą', icon: 'flag-outline', id: 'report' },
    { title: 'Informacijos šaltiniai', icon: 'book-outline', id: 'sources' },
    { title: 'Paremti', icon: 'cafe-outline', id: 'donate' },
    { title: 'Apie programą', icon: 'information-circle-outline', id: 'about' }
]

export default function Settings() {

    const mappedSettings = settings.map((item, index) => {
        return <SettingsItem key={`${item.id}-${index}`} icon={item.icon} title={item.title} id={item.id} />
    });

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Nustatymai'
                }}
            />
            <View style={styles.container}>
                {mappedSettings}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        // padding: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        margin: 10,
        boxShadow: '0 5 12 rgba(0,0,0,0.1)'
    }
});