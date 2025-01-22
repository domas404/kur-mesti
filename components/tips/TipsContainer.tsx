import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import TipList from "./TipList";

const tabInfo = [
    { id: 'do', text: 'Mesti' },
    { id: 'dont', text: 'Nemesti' },
    { id: 'tips', text: 'Patarimai', icon: 'remove-outline', tint: 'blue' },
];

type WasteSiteMap = {
    [key: string]: string,
}

const wasteSiteMap: WasteSiteMap = {
    'paper': 'Popierius ir kartonas',
    'plastic': 'Plastikas ir metalas',
    'glass': 'Stiklas',
    'compost': 'Kompostas',
    'fabric': 'Tekstilė'
}

type Props = {
    selectedWasteSite: string
}

export default function TipsContainer({ selectedWasteSite }: Props) {
    
    const {
        container: backgroundColor,
        text: color,
        tab: tabColor,
        tint,
        tintText,
        border,
    } = useThemeColor();

    const [tab, setTab] = useState<string>('do');

    const changeTab = (selectedTab: string) => {
        setTab(selectedTab);
    }

    const tabs = tabInfo.map((item, index) => {
        return (
            <TouchableOpacity
                key={`${item}-${index}`}
                style={[styles.tab, {backgroundColor: tabColor}, tab === item.id && {backgroundColor: tint}]}
                onPress={() => changeTab(item.id)}
                activeOpacity={0.7}
            >
                <Text style={[styles.tabText, {color: tab === item.id ? tintText : color}]}>{item.text}</Text>
            </TouchableOpacity>
        );
    })

    return (
        <View style={[styles.container, {backgroundColor, borderColor: border}]}>
            <View style={styles.header}>
                <Text style={[styles.headerText, {color}]}>{wasteSiteMap[selectedWasteSite]}</Text>
            </View>
            <View>
                <View style={styles.tabContainer}>
                    {tabs}
                </View>
                <TipList color={color} tab={tab} selectedWasteSite={selectedWasteSite} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderRadius: 20,
        margin: 10,
        borderWidth: 1,
        gap: 16
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    headerText: {
        fontSize: 18,
        fontWeight: 500,
    },
    tabContainer: {
        flexDirection: 'row',
        gap: 6
    },
    tab: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: '#ddd',
        paddingHorizontal: 20,
    },
    tabText: {
        fontSize: 16,
    },
})