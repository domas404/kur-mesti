import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DatePicker from "./DatePicker";

type Props = {
    setBiWeeklySchedule: (selectedWeekdays: number[], interval: number, startDate: Date) => void;
}

const initialWeekSetting: boolean[] = Array(7).fill(false);

export default function BiWeeklySchedule({ setBiWeeklySchedule }: Props) {

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

    const [
        backgroundColor,
        color,
        border,
        tint,
        tintLight,
        tintText
    ] = useThemeColor(['container', 'text', 'border', 'tint', 'tintLight', 'tintText']);

    // const [mappedWeekdays, setMappedWeekdays] = useState();

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
        setBiWeeklySchedule(weekdays, weekInterval, date);
    }, [weekSetting, weekInterval, date]);

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
    },
    selectedRepeatPatternText: {
        fontSize: 16,
        textAlign: 'center',
        width: 60,
        borderRightWidth: 1,
        // flex: 2,
        // width: '80%',
    },
    selectContainer: {
        // padding: 20,
        // paddingHorizontal: 20,
        // height: 64,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        // width: '50%',
        alignSelf: 'flex-start',
        // gap: 20,
    },
    toggleNumberButton: {
        // borderWidth: 1,
        padding: 8,
        // backgroundColor: 'purple',
        borderRadius: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        // flex: 3,
        paddingHorizontal: 10,
        gap: 4,
    }
});