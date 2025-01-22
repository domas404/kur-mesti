import { View, Text, StyleSheet, TouchableOpacity, Appearance, ColorSchemeName } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

export default function Theme() {

    const { text: color, container: backgroundColor, tab: tabColor, tabActive: tabActiveColor } = useThemeColor();

    const [nativeColorScheme, setNativeColorScheme] = useState<ColorSchemeName | null>(null);
    const [colorSchemeChanged, setColorSchemeChanged] = useState<boolean>(false);

    useEffect(() => {
        const setThemeToStorage = async () => {
            // console.log(`setting color scheme to: ${nativeColorScheme}`);
            if (nativeColorScheme === null) {
                await AsyncStorage.removeItem('theme');
                Appearance.setColorScheme(null);
            } else {
                await AsyncStorage.setItem('theme', nativeColorScheme as string);
                Appearance.setColorScheme(nativeColorScheme);
            }
        }
        if (colorSchemeChanged) {
            setThemeToStorage();
            setColorSchemeChanged(false);
        }

    }, [nativeColorScheme]);

    useEffect(() => {
        const loadThemeFromStorage = async () => {
            const theme = await AsyncStorage.getItem('theme');
            if (['light', 'dark', null].includes(theme)) {
                setNativeColorScheme(theme as ColorSchemeName);
            }
        }
        loadThemeFromStorage();
    }, []);

    const updateColorScheme = (theme: ColorSchemeName | null) => {
        setNativeColorScheme(theme);
        setColorSchemeChanged(true);
    }


    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Tema'
                }}
            />
            <View style={[styles.container, {backgroundColor}]}>
                {/* <Text style={{color, marginLeft: 12, fontSize: 16}}>Pasirinkite programos spalvų temą:</Text> */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tab, { backgroundColor: nativeColorScheme === 'light' ? tabActiveColor : tabColor }]}
                        activeOpacity={0.7}
                        onPress={() => updateColorScheme('light')}
                    >
                        <View style={[styles.iconContainer]}>
                            <Ionicons name={nativeColorScheme === 'light' ? 'sunny' : 'sunny-outline'} size={20} color={color} />
                        </View>
                        <Text style={[styles.tabText, {color}]}>Šviesi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, { backgroundColor: nativeColorScheme === 'dark' ? tabActiveColor : tabColor }]}
                        activeOpacity={0.7}
                        onPress={() => updateColorScheme('dark')}
                    >
                        <View style={[styles.iconContainer]}>
                            <Ionicons name={nativeColorScheme === 'dark' ? 'moon' : 'moon-outline'} size={20} color={color} />
                        </View>
                        <Text style={[styles.tabText, {color}]}>Tamsi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, { backgroundColor: nativeColorScheme === null ? tabActiveColor : tabColor }]}
                        activeOpacity={0.7}
                        onPress={() => updateColorScheme(null)}
                    >
                        <View style={[styles.iconContainer]}>
                            <Ionicons
                                name={nativeColorScheme === null ? 'phone-portrait' : 'phone-portrait-outline'}
                                size={20}
                                color={color}
                            />
                        </View>
                        <Text style={[styles.tabText, {color}]}>Sistema</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 20,
        borderRadius: 20,
        gap: 10,
    },
    tabContainer: {
        flexDirection: 'column',
        gap: 10,
        // justifyContent: 'space-between'
    },
    tab: {
        flexDirection: 'row',
        gap: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 100,
        // flex: 1,
        // justifyContent: 'center',
    },
    tabText: {
        fontSize: 16,
    },
    iconContainer: {
        padding: 8,
        borderRadius: 100,
    }
});