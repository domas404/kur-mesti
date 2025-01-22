import { useThemeColor } from "@/hooks/useThemeColor";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
    setWeeklySchedule: (value: number[]) => void;
    initialWeekdays: number[];
}

const initialWeekSetting: boolean[] = [false, false, false, false, false, false, false];

export default function WeeklySchedule({ setWeeklySchedule, initialWeekdays }: Props) {

    const [weekSetting, setWeekSetting] = useState<boolean[]>(initialWeekSetting);

    const [color, border, tint, tintLight, tintText] = useThemeColor(['text', 'border', 'tint', 'tintLight', 'tintText']);

    // const [mappedWeekdays, setMappedWeekdays] = useState();

    useEffect(() => {
        console.log(weekSetting);
        if (initialWeekdays) {
            const weekSettingCopy = [...weekSetting];
            initialWeekdays.forEach((item, i) => {
                weekSettingCopy[item] = true;
            })
            setWeekSetting([...weekSettingCopy]);
        }
    }, []);

    const updateWeekSetting = (index: number) => {
        setWeekSetting(() => {
            const newValue = [...weekSetting];
            newValue[index] = !newValue[index];
            return newValue;
        })
    }

    const mappedWeekdays = weekSetting.map((item, index) => {
        const week = ['P', 'A', 'T', 'K', 'P', 'Š', 'S'];
        return (
            <TouchableOpacity
                style={[styles.weekdayButton, item && {backgroundColor: tintLight}, {borderColor: border}]}
                key={`${week[index]}-${index}`}
                activeOpacity={0.7}
                onPress={() => updateWeekSetting(index)}
            >
                <Text style={[styles.weekdayButtonText, item ? {color: tintText} : {color}]}>{week[index]}</Text>
            </TouchableOpacity>
        );
    });

    useEffect(() => {
        const weekdays: number[] = [];
        weekSetting.forEach((item, index) => {
            if (item)
                weekdays.push(index);
        });
        // console.log(weekdays);
        setWeeklySchedule(weekdays);

    }, [weekSetting]);

    return (
        <View>
            <Text style={[styles.containerLabel, {color}]}>Savaitės diena(-os)</Text>
            <View style={styles.weekdayListContainer}>
                {mappedWeekdays}
            </View>
            <View style={styles.weekdayList}>
                {
                    weekSetting.map((item, index) => {
                        const weekdays = ['Pirmadienis', 'Antradienis', 'Trečiadienis', 'Ketvirtadienis', 'Penktadienis', 'Šeštadienis', 'Sekmadienis'];
                        if (item) {
                            return (
                                <Text key={index} style={[styles.weekdayListItem, {backgroundColor: tint, color: tintText}]}>
                                    {weekdays[index]}
                                </Text>
                            );
                        }
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        // gap: 10
    },
    weekdayButton: {
        width: 36,
        height: 36,
        // flexDirection: 'row',
        // backgroundColor: '#158abb',
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
        // color: 'white'
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
        // backgroundColor: '#eee',
        borderRadius: 4,
        marginRight: 5,
        marginBottom: 5
    }
});