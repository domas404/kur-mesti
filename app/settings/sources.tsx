import { View, Text, StyleSheet, Pressable } from "react-native";
import { ExternalPathString, Link, Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";

const dataSourceList = [
    { title: 'Žaliasis taškas', link: 'https://www.zaliasistaskas.lt/' },
    { title: 'Gamtos ateitis', link: 'https://gamtosateitis.lt/' },
    { title: 'Aplinkos apsaugos agentūra', link: 'https://gamta.lt/' },
    { title: 'Ecoservice', link: 'https://ecoservice.lt/' },
    { title: 'Vilniaus apskrities atliekų tvarkymo centras', link: 'https://www.vaatc.lt/' },
    { title: 'Klaipėdos regiono atliekų tvarkymo centras', link: 'https://www.kratc.lt/' },
];

export default function Sources() {

    const { container, text: color, border, tintLight, tintText } = useThemeColor();

    const mappedDataSourceList = dataSourceList.map((item, index) => {
        return (
            <Link key={index} style={styles.sourceItem} href={item.link as ExternalPathString} asChild>
                <Pressable key={index}>
                    <View style={styles.header}>
                        <View style={[styles.iconContainer, { backgroundColor: tintLight }]}>
                            <MaterialIcons name={'recycling'} size={24} color={tintText} />
                        </View>
                        <Text style={[styles.headerText, {color}]}>{item.title}</Text>
                    </View>
                    <MaterialIcons style={styles.openLinkIcon} name={'open-in-new'} size={20} color={color} />
                </Pressable>
            </Link>
        )
    });

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Informacijos šaltiniai'
                }}
            />
            <View style={[styles.container, { backgroundColor: container, borderColor: border }]}>
                {mappedDataSourceList}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 12,
        margin: 10,
        gap: 10
    },
    sourceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16
    },
    iconContainer: {
        padding: 4,
        borderRadius: 100,
    },
    headerText: {
        fontSize: 16,
        width: '75%',
    },
    openLinkIcon: {
        opacity: 0.5,
    }
})