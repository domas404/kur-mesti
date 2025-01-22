import { useThemeColor } from "@/hooks/useThemeColor";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
    setMonthlySchedule: (selectedDays: number[]) => void;
    initialMonthSetting: number[];
}

const initialWeekSetting: boolean[] = Array(31).fill(false);

export default function RepeatMonthly({ setMonthlySchedule, initialMonthSetting }: Props) {

    const [weekSetting, setWeekSetting] = useState<boolean[]>(initialWeekSetting);

    const {
        text: color,
        border,
        tintLight,
        tintText
    } = useThemeColor();

    const updateWeekSetting = (index: number) => {
        setWeekSetting(() => {
            const newValue = [...weekSetting];
            newValue[index] = !newValue[index];
            return newValue;
        })
    }

    useEffect(() => {
        if (initialMonthSetting) {
            const weekSettingCopy = [...weekSetting];
            initialMonthSetting.forEach((day) => {
                weekSettingCopy[day-1] = true;
            });
            setWeekSetting(weekSettingCopy);
        }
    }, []);

    const mappedWeekdays = weekSetting.map((item, index) => {
        return (
            <View style={styles.dayButtonContainer} key={`${index}`}>
                <TouchableOpacity
                    style={[styles.dayButton, item && {backgroundColor: tintLight}, {borderColor: border}]}
                    activeOpacity={0.7}
                    onPress={() => updateWeekSetting(index)}
                >
                    <Text style={[styles.dayButtonText, item ? {color: tintText} : {color}]}>{index+1}</Text>
                </TouchableOpacity>
            </View>
        );
    });

    useEffect(() => {
        const days: number[] = [];
        weekSetting.forEach((item, index) => {
            if (item)
                days.push(index);
        });
        // console.log(weekdays);
        setMonthlySchedule(days);
    }, [weekSetting]);

    return (
        <View>
            <Text style={[styles.containerLabel, {color}]}>Mėnesio diena(-os)</Text>
            <View style={styles.dayListContainer}>
                {mappedWeekdays}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerLabel: {
        padding: 5,
    },
    dayListContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        paddingVertical: 10,
    },
    dayButtonContainer: {
        flexBasis: '14.2%',
        paddingVertical: 4,
    },
    dayButton: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#ddd',
        
    },
    dayButtonText: {
        fontSize: 16,
        textAlign: 'center',
    },
});