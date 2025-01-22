import { View, StyleSheet } from "react-native";
import { tipList } from "@/data/tips";
import TipItem from "./TipItem";

type TabFormMap = {
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

type Props = {
    color: string,
    tab: string,
    selectedWasteSite: string
}

export default function TipList({ color, tab, selectedWasteSite }: Props) {

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
    },
});