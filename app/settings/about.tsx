import { View, Text, StyleSheet } from "react-native";
import { Stack } from "expo-router";

import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";

const aboutData = {
    version: '1.0.0',
    lastUpdate: '2025-04-16',
    updateList: ['Papildyta atliekų duomenų bazė', 'Optimizuotas programos veikimas'],
}

export default function About() {

    const { container, text: color, border, tintLight, tintText } = useThemeColor();

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Apie programą'
                }}
            />
            <View style={[styles.container, { backgroundColor: container, borderColor: border }]}>
                <Text style={[styles.headerText, {color: tintLight}]}>"Kur mesti?"</Text>
                <Text style={[styles.text, {color}]}>
                    Programėlės tikslas - padėti teisingai atsikratyti atliekomis ir pagerinti informacijos, susįjusios su rūšiavimu ir tvarumu Lietuvoje, prieinamumą.
                </Text>
            </View>
            <View style={[styles.container, { backgroundColor: container, borderColor: border }]}>
                <Text style={[styles.headerText, {color: tintLight}]}>Kas naujo?</Text>
                <View style={styles.listContainer}>
                    {
                        aboutData.updateList.map((item, index) => {
                            return (
                                <View style={styles.listItem} key={index}>
                                    <Ionicons name={'checkmark-outline'} color={color} size={16} />
                                    <Text style={[styles.text, {color}]}>{item}</Text>
                                </View>
                            );
                        })
                    }
                </View>
            </View>
            <View style={styles.footer}>
                <Text style={[styles.versionText]}>Programos versija {aboutData.version}</Text>
                <Text style={[styles.versionText]}>Paskutinis atnaujinimas {aboutData.lastUpdate}</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 16,
        marginHorizontal: 10,
        marginTop: 10,
        gap: 10
    },
    headerText: {
        fontSize: 20,
        fontWeight: 500
    },
    listContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    listItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },
    text: {
        fontSize: 16,
    },
    footer: {
        marginLeft: 10,
        paddingLeft: 10,
        marginTop: 10,
    },
    versionText: {
        color: '#777',
    }
})