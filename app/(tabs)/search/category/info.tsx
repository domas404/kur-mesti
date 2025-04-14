import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useThemeColor } from '@/hooks/useThemeColor';
import { wasteDisposalSiteMap } from '@/data/disposal-sites';

export default function Page() {

    const { container, text: color, border } = useThemeColor();

    const mappedDisposalMethodList = Object.keys(wasteDisposalSiteMap).map((item, index) => {
        const { name, color: siteColor, borderRadius } = wasteDisposalSiteMap[item];
        return (
            <View key={index} style={styles.sourceItem}>
                <View style={styles.header}>
                    <View style={[styles.iconContainer, { backgroundColor: siteColor, borderRadius: borderRadius }]}>
                        <Ionicons name={'trash'} size={20} color={'white'} />
                    </View>
                    <Text style={[styles.headerText, {color}]}>{name}</Text>
                </View>
                <Ionicons name={'chevron-down'} size={20} color={color} />
            </View>
        )
    });

    return (
        <>
            <Stack.Screen
                options={{
                    title: "Atliekų išmetimo būdai",
                }}
            />
            <SafeAreaProvider>
                <SafeAreaView>
                    <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                        <View style={[styles.container, { backgroundColor: container, borderColor: border }]}>
                            {mappedDisposalMethodList}
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </SafeAreaProvider>
        </>
    );
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
        width: '80%',
    },
    openLinkIcon: {
        opacity: 0.5,
    }
});