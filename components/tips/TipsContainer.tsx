import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import TipList from "./TipList";
import { useState } from "react";

const image = require('@/assets/images/icons/poly-bag.png');

const tabInfo = [
    { id: 'do', text: 'Mesti' },
    { id: 'dont', text: 'Nemesti' },
    { id: 'tips', text: 'Patarimai', icon: 'remove-outline', tint: 'blue' },
];

interface WasteSiteMap {
    [key: string]: string,
}

const wasteSiteMap: WasteSiteMap = {
    'paper': 'Popierius ir kartonas',
    'plastic': 'Plastikas ir metalas',
    'glass': 'Stiklas',
    'compost': 'Kompostas',
    'fabric': 'Tekstilė'
}

interface TipsContainerProps {
    selectedWasteSite: string
}

export default function TipsContainer({ selectedWasteSite }: TipsContainerProps) {

    const backgroundColor = useThemeColor({}, 'container');
    const color = useThemeColor({}, 'text');
    const tabColor = useThemeColor({}, 'tab');
    const tabActiveColor = useThemeColor({}, 'tabActive');
    const tint = useThemeColor({}, 'tint');
    const tintLight = useThemeColor({}, 'tintLight');
    const tintText = useThemeColor({}, 'tintText');
    const border = useThemeColor({}, 'border');

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
                {/* <Image
                    source={image}
                    tintColor={color}
                    contentFit="cover"
                    style={styles.image}
                /> */}
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
        // boxShadow: '0 5 12 rgba(0,0,0,0.1)',
        gap: 16
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    image: {
        height: 60,
        width: 60
    },
    headerText: {
        fontSize: 18,
        fontWeight: 500,
        // textTransform: 'uppercase',
        // backgroundColor: 'red',
    },
    tabContainer: {
        flexDirection: 'row',
        gap: 6
    },
    tab: {
        height: 40,
        // width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: '#ddd',
        // width: 100,
        paddingHorizontal: 20,
        // paddingVertical: 12,
    },
    // selectedTab: {
    //     backgroundColor: '#555',
    // },
    tabText: {
        fontSize: 16,
    },
    // selectedTabText: {
    //     color: 'white'
    // }
})