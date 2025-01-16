import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type Props = {

}

const initialWeekSetting: boolean[][] = Array(5).fill(null).map(()=>Array(7).fill(false));

export default function MonthlyScheduleByWeekdays() {

    const [weekSetting, setWeekSetting] = useState<boolean[][]>(initialWeekSetting);

    const [
        backgroundColor,
        color,
        border,
        tint,
        tintLight,
        tintText
    ] = useThemeColor(['container', 'text', 'border', 'tint', 'tintLight', 'tintText']);

    const updateWeekSetting = (i: number, j: number) => {
        setWeekSetting(() => {
            const newValue = [...weekSetting];
            newValue[i][j] = !newValue[i][j];
            return newValue;
        })
    }

    const mappedWeekdays = weekSetting.map((item, i) => {
        const mappedWeek = item.map((day, j) => {
            const week = ['P', 'A', 'T', 'K', 'P', 'Š', 'S'];
            return (
                <View style={styles.weekdayButtonContainer} key={`${week[j]}${j}-${i}`}>
                    <TouchableOpacity
                        style={[styles.weekdayButton, day && {backgroundColor: tintLight}, {borderColor: border}]}
                        activeOpacity={0.7}
                        onPress={() => updateWeekSetting(i, j)}
                    >
                        <Text style={[styles.weekdayButtonText, day ? {color: tintText} : {color}]}>{week[j]}</Text>
                    </TouchableOpacity>
                </View>
            );
        });
        return (
            <View style={styles.weekContainer} key={i}>
                {mappedWeek}
            </View>
        );
    });

    return (
        <View>
            <Text style={[styles.containerLabel, {color}]}>Savaitės diena(-os)</Text>
            <View style={styles.weekdayListContainer}>
                {mappedWeekdays}
            </View>
            <View style={styles.weekdayList}>
                {
                    weekSetting.map((item, i) => {
                        const week = item.map((day, j) => {
                            const weekdays = ['Pirmadienis', 'Antradienis', 'Trečiadienis', 'Ketvirtadienis', 'Penktadienis', 'Šeštadienis', 'Sekmadienis'];
                            const weeks = ['Pirmas', 'Antras', 'Trečias', 'Ketvirtas', 'Penktas'];
                            if (day) {
                                return (
                                    <Text key={`${i}-${j}`} style={[styles.weekdayListItem, {backgroundColor: tint, color: tintText}]}>
                                        {weeks[i]} {weekdays[j]}
                                    </Text>
                                );
                            }
                        });
                        return week;
                    })
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerLabel: {
        padding: 5,
    },
    weekdayListContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    weekContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    weekdayButtonContainer: {
        paddingVertical: 4,
    },
    weekdayButton: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    weekdayButtonSelected: {
        backgroundColor: '#92a8fc',
    },
    weekdayButtonText: {
        fontSize: 18,
        textAlign: 'center',
    },
    weekdayList: {
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
    },
});