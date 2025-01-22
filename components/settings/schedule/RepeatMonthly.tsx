import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

type Props = {
    setMonthlySchedule: (selectedDays: number[]) => void;
    initialMonthSetting: number[];
}

const initialMonthDays: boolean[] = Array(31).fill(false);

export default function RepeatMonthly({ setMonthlySchedule, initialMonthSetting }: Props) {

    const [monthDays, setMonthDays] = useState<boolean[]>(initialMonthDays);

    const {
        text: color,
        border,
        tintLight,
        tintText
    } = useThemeColor();

    const updateMonthDays = (index: number) => {
        setMonthDays(() => {
            const newValue = [...monthDays];
            newValue[index] = !newValue[index];
            return newValue;
        })
    }

    useEffect(() => {
        if (initialMonthSetting) {
            const monthDaysCopy = [...monthDays];
            initialMonthSetting.forEach((day) => {
                monthDaysCopy[day-1] = true;
            });
            setMonthDays(monthDaysCopy);
        }
    }, []);

    const mappedDays = monthDays.map((item, index) => {
        return (
            <View style={styles.dayButtonContainer} key={`${index}`}>
                <TouchableOpacity
                    style={[styles.dayButton, item && {backgroundColor: tintLight}, {borderColor: border}]}
                    activeOpacity={0.7}
                    onPress={() => updateMonthDays(index)}
                >
                    <Text style={[styles.dayButtonText, item ? {color: tintText} : {color}]}>{index+1}</Text>
                </TouchableOpacity>
            </View>
        );
    });

    useEffect(() => {
        const days: number[] = [];
        monthDays.forEach((item, index) => {
            if (item)
                days.push(index);
        });
        setMonthlySchedule(days);
    }, [monthDays]);

    return (
        <View>
            <Text style={[styles.containerLabel, {color}]}>Mėnesio diena(-os)</Text>
            <View style={styles.dayListContainer}>
                {mappedDays}
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