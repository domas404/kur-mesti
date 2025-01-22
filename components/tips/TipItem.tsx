import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
    color: string,
    icon: any,
    text: string
    tintColor?: string,
    selectedWasteSite: string
}

export default function TipItem({ color, icon, text, tintColor, selectedWasteSite }: Props) {
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
    },
    listItemText: {
        fontSize: 16,
        flex: 1,
        flexWrap: 'wrap'
    }
});