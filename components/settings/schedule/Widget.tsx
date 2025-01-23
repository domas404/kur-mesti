import { Ionicons } from "@expo/vector-icons";
import { useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import WidgetMenu from "./WidgetMenu";
import { useThemeColor } from "@/hooks/useThemeColor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScheduleItem } from "@/types/schedule";
import { calculateDaysUntil, sortScheduleList } from "@/utils/schedule/scheduleUtils";
import { useFocusEffect } from "@react-navigation/native";

type ScheduleInfo = {
    daysUntil: number;
    date: string;
    weekday: number;
}

const weekdays = ['Sekmadienis', 'Pirmadienis', 'Antradienis', 'Trečiadienis', 'Ketvirtadienis', 'Penktadienis', 'Šeštadienis'];

export default function ScheduleWidget() {

    const { text: color, container: backgroundColor, border } = useThemeColor();
    const [schedule, setSchedule] = useState<ScheduleInfo>({ daysUntil: -1, date: '', weekday: -1 });
    const [menuVisible, setMenuVisible] = useState<boolean>(false);

    const toggleMenuVisibility = () => {
        setMenuVisible(!menuVisible);
    }

    const closeMenu = () => {
        setMenuVisible(false);
    }

    const getText = (daysUntil: number) => {
        let text = daysUntil + ' dienų';

        if (daysUntil === 0) {
            text = 'Šiandien';
        } else if (daysUntil === 1) {
            text = 'Rytoj';
        } else if (daysUntil % 10 === 1 && daysUntil !== 11) {
            text = daysUntil + ' dienos';
        }

        return text;
    }

    useFocusEffect(
        useCallback(() => {
            const setupScheduleList = async () => {
                const storage = await AsyncStorage.getItem('schedule');
                if (storage) {
                    const scheduleObjectList: ScheduleItem[] = await JSON.parse(storage) as ScheduleItem[];
                    sortScheduleList(scheduleObjectList);
                    const closestDate = new Date(scheduleObjectList[0].closestDate!);
                    setSchedule({
                        ...schedule,
                        daysUntil: calculateDaysUntil(closestDate),
                        date: closestDate.toISOString().slice(5, 10),
                        weekday: closestDate.getDay()
                    })
                }
                // await AsyncStorage.clear();
            }
            setupScheduleList();
        }, [])
    );

    return (
        <>
            <View style={[styles.container, {backgroundColor, borderColor: border}]}>
                <View style={styles.header}>
                    <Text style={[styles.headerText, {color}]}>Atliekų išvežimas{schedule.daysUntil > 1 && ' po'}:</Text>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={toggleMenuVisibility}
                    >
                        <Ionicons name={'ellipsis-vertical'} size={24} color={color} />
                    </TouchableOpacity>
                    <WidgetMenu visible={menuVisible} closeMenu={closeMenu} color={color} backgroundColor={backgroundColor} border={border} />
                </View>
                <Text style={[styles.countdownText, {color}]}>{schedule.daysUntil > -1 ? getText(schedule.daysUntil) : 'Nenustatyta'}</Text>
                <View style={styles.scheduleDateContainer}>
                    <Text style={[styles.scheduleDate]}>{schedule.date !== '' ? schedule.date : '--/--'} {schedule.weekday > -1 ? weekdays[schedule.weekday] : ''}</Text>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderWidth: 1,
		borderColor: '#dadada',
        margin: 10,
        borderRadius: 20,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerText: {
        fontSize: 18,
    },
    countdownText: {
        fontSize: 42,
        fontWeight: 500
    },
    scheduleDateContainer: {
        backgroundColor: '#3B5E47',
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8
    },
    scheduleDate: {
        fontSize: 16,
        color: '#E4FFE6',
    },
});