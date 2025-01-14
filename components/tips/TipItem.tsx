import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

interface TipItemProps {
    color: string,
    icon: any,
    text: string
    tintColor?: string,
    selectedWasteSite: string
}

export default function TipItem({ color, icon, text, tintColor, selectedWasteSite }: TipItemProps) {
    return (
        <View style={styles.listItem}>
            <Ionicons style={styles.listIcon} name={icon} size={24} color={tintColor ?? color} />
            <Text style={[styles.listItemText, {color}]}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    listIcon: {
        width: 24
    },
    listItem: {
        flexDirection: 'row',
        gap: 10,
        alignItems:'center',
        // flex: 1,
    },
    listItemText: {
        fontSize: 16,
        flex: 1,
        flexWrap: 'wrap'
    }
});