import { View, Text, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

type Props = {
    weekSetting: boolean[];
}

export default function WeekdayNames({ weekSetting }: Props) {

    const { tint, tintText } = useThemeColor();

    const mappedWeekdayNames = weekSetting.map((item, index) => {
        const weekdays = ['Pirmadienis', 'Antradienis', 'Trečiadienis', 'Ketvirtadienis', 'Penktadienis', 'Šeštadienis', 'Sekmadienis'];
        if (item) {
            return (
                <Text key={index} style={[styles.weekdayListItem, {backgroundColor: tint, color: tintText}]}>
                    {weekdays[index]}
                </Text>
            );
        }
    });

    return (
        <View style={styles.container}>
            {mappedWeekdayNames}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 5,
        flexWrap: 'wrap',
    },
    weekdayListItem: {
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 4,
        marginRight: 5,
        marginBottom: 5
    }
})