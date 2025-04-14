import { wasteDisposalSiteNameMap } from '@/data/waste-categories';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type WasteSiteColorMap = {
    [id: string]: string
}

const wasteSiteColorMap: WasteSiteColorMap = {
    hazardous: '#db3030',
    fabric: '#4d5473',
    glass: '#46995a',
    plastic: '#cca516',
    paper: '#214fc2',
    compost: '#523a20',
    donate: '#555',
    electronics: '#752CC4',
    farmacy: '#37B6BD',
    mixed: '#555',
    tare: '#FF751A',
}

type WasteSiteBorderRadiusMap = {
    [id: string]: number
}

const wasteSiteBorderRadiusMap: WasteSiteBorderRadiusMap = {
    hazardous: 4,
    fabric: 4,
    glass: 14,
    plastic: 14,
    paper: 14,
    compost: 4,
    donate: 4,
    electronics: 4,
    farmacy: 4,
    mixed: 14,
    tare: 4,
}

export default function Page() {

    const { container, text: color, border, tintLight, tintText } = useThemeColor();

    const mappedDisposalMethodList = Object.keys(wasteDisposalSiteNameMap).map((item, index) => {
        return (
            <View key={index} style={styles.sourceItem}>
                <View style={styles.header}>
                    <View style={[styles.iconContainer, { backgroundColor: wasteSiteColorMap[item], borderRadius: wasteSiteBorderRadiusMap[item] }]}>
                        {/* <MaterialIcons name={'recycling'} size={24} color={tintText} /> */}
                        <Ionicons name={'trash'} size={20} color={'white'} />
                    </View>
                    <Text style={[styles.headerText, {color}]}>{wasteDisposalSiteNameMap[item]}</Text>
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