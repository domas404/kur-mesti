import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { useThemeColor } from "@/hooks/useThemeColor";
import DatePicker from "./DatePicker";
import Weekdays from "./Weekdays";
import WeekdayNames from "./WeekdayNames";

type Props = {
    setBiWeeklySchedule: (selectedWeekdays: number[], interval: number, startDate: Date) => void;
    initialWeekdays: number[];
    initialInterval: number;
    initialDate: string;
}

const initialWeekSetting: boolean[] = Array(7).fill(false);

export default function RepeatBiWeekly({ setBiWeeklySchedule, initialWeekdays, initialInterval, initialDate }: Props) {

    const [weekSetting, setWeekSetting] = useState<boolean[]>(initialWeekSetting);
    const [weekInterval, setWeekInterval] = useState<number>(2);
    const [date, setDate] = useState<Date>(new Date());

    const increaseWeekInterval = () => {
        const increasedValue = weekInterval+1;
        if (increasedValue < 10)
            setWeekInterval(increasedValue);
    }

    const decreaseWeekInterval = () => {
        const decreasedValue = weekInterval-1;
        if (decreasedValue > 0)
            setWeekInterval(decreasedValue);
    }

    const { container: backgroundColor, text: color, border } = useThemeColor();

    useEffect(() => {
        if (initialWeekdays && initialInterval && initialDate) {
            const weekSettingCopy = [...weekSetting];
            initialWeekdays.forEach((item, i) => {
                weekSettingCopy[item] = true;
            })
            setWeekSetting([...weekSettingCopy]);
            setWeekInterval(initialInterval);
            setDate(new Date(initialDate));
        }
    }, []);

    const updateWeekSetting = (index: number) => {
        setWeekSetting(() => {
            const newValue = [...weekSetting];
            newValue[index] = !newValue[index];
            return newValue;
        })
    }

    useEffect(() => {
        const weekdays: number[] = [];
        weekSetting.forEach((item, index) => {
            if (item)
                weekdays.push(index);
        });
        setBiWeeklySchedule(weekdays, weekInterval, date);
    }, [weekSetting, weekInterval, date]);

    return (
        <View>
            <Text style={[styles.containerLabel, {color}]}>Savaitės diena(-os)</Text>
            <Weekdays weekSetting={weekSetting} updateWeekSetting={updateWeekSetting} />
            <WeekdayNames weekSetting={weekSetting} />

            <Text style={[styles.containerLabel, {color}]}>Kas kiek savaičių?</Text>
            <View style={[styles.selectContainer, {backgroundColor, borderColor: border}]}>
                <Text style={[styles.selectedRepeatPatternText, {color, borderRightColor: border}]} numberOfLines={1}>
                    {weekInterval}
                </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.toggleNumberButton, {borderColor: border}]} onPress={increaseWeekInterval}>
                        <Ionicons name={'add'} size={24} color={color} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.toggleNumberButton, {borderColor: border}]} onPress={decreaseWeekInterval}>
                        <Ionicons name={'remove'} size={24} color={color} />
                    </TouchableOpacity>
                </View>
            </View>
            
            <Text style={[styles.containerLabel, {color}]}>Pradedant nuo:</Text>
            <DatePicker date={date} setDate={setDate} />
        </View>
    );
}

const styles = StyleSheet.create({
    containerLabel: {
        padding: 5,
    },
    selectedRepeatPatternText: {
        fontSize: 16,
        textAlign: 'center',
        width: 60,
        borderRightWidth: 1,
    },
    selectContainer: {
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        alignSelf: 'flex-start',
    },
    toggleNumberButton: {
        padding: 8,
        borderRadius: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        gap: 4,
    }
});