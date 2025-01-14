import { View, Text, StyleSheet } from "react-native";
import TipItem from "./TipItem";

import { tipList } from "@/data/tips";
import { useThemeColor } from "@/hooks/useThemeColor";

interface TabFormMap {
    [key: string]: {
        icon: any,
        tint: string
    }
}

const tabFormatMap: TabFormMap = {
    'do': {
        icon: 'checkmark-sharp',
        tint: 'green'
    },
    'dont': {
        icon: 'close',
        tint: 'red'
    },
    'tips': {
        icon: 'remove',
        tint: 'gold'
    },
}

interface TipListProps {
    color: string,
    // backgroundColor: string,
    tab: string,
    selectedWasteSite: string
    // icon: any,
    // tint: string
}

export default function TipList({ color, tab, selectedWasteSite }: TipListProps) {

    const mappedTips = tipList[selectedWasteSite][tab].map((item, index) => {
        return (
            <View key={`${item}-${index}`} style={styles.listContainer}>
                <TipItem
                    color={color}
                    icon={tabFormatMap[tab].icon}
                    text={item}
                    tintColor={tabFormatMap[tab].tint}
                    selectedWasteSite={selectedWasteSite}
                />
            </View>
        );
    })
    
    return (
        <View style={styles.listContainer}>
            {mappedTips}
        </View>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 10,
        // gap: 4,
        // flexDirection: 'column',
        // boxSizing: 'border-box',
        // alignItems: 'flex-start'
    },
});