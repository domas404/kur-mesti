import RepeatNav from "@/components/settings/schedule/RepeatNav";
import ScheduleOneTime from "@/components/settings/schedule/ScheduleOneTime";
import ScheduleRepeat from "@/components/settings/schedule/ScheduleRepeat";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Stack } from "expo-router";
import { useEffect, useId, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type ScheduleItem = {
    id: string;
    visible: boolean;
    repeat: boolean;
    closestDate: string | undefined;

    period?: 'weekly' | 'bi-weekly' | 'monthly' | 'monthly-by-weekdays';
    weekdays?: number[];
    interval?: number;
    startDate?: string;
    days?: number[];
    weekPatern?: {
        week: number;
        weekdays: string[];
    }[];
}


export default function Item() {

    const [containerColor, color, tabActiveColor] = useThemeColor(['container', 'text', 'tabActive']);

    const [schedule, setSchedule] = useState<ScheduleItem>({ id: useId(), visible: true, repeat: false, closestDate: undefined });

    const changeRepeat = (repeat: boolean) => {
        setSchedule({
            ...schedule,
            repeat: repeat
        })
    }

    const findClosestDay = (selectedWeekdays: number[], startDate: Date) => {
        const selectedWeekdaysAdjusted = selectedWeekdays.map((weekday) => {
            return (weekday+1)%7;
        });

        const closestWeekdays = selectedWeekdaysAdjusted.map((weekday) => {
            return ((weekday+7)-startDate.getDay())%7;
        });

        const closestDay = Math.min(...closestWeekdays);

        return closestDay;
    }

    const calculateClosestDate = (date: Date, days: number) => {
        const newDate = new Date(date);
        newDate.setDate(date.getDate() + days);
        return newDate;
    }

    const setWeeklySchedule = (selectedWeekdays: number[]) => {

        if (selectedWeekdays.length > 0) {
            const today = new Date();
            const closestDay = findClosestDay(selectedWeekdays, today);
            const closestDate = calculateClosestDate(today, closestDay);
    
            setSchedule({
                ...schedule,
                period: 'weekly',
                weekdays: selectedWeekdays,
                closestDate: closestDate.toString()
            });
        }
    }

    const setBiWeeklySchedule = (selectedWeekdays: number[], interval: number, startDate: Date) => {

        if (selectedWeekdays.length > 0) {
            const closestDay = findClosestDay(selectedWeekdays, startDate);
            const closestDate = calculateClosestDate(startDate, closestDay);
    
            setSchedule({
                ...schedule,
                interval: interval,
                period: 'bi-weekly',
                weekdays: selectedWeekdays,
                closestDate: closestDate.toString(),
                startDate: startDate.toString()
            });
        }
    }

    useEffect(() => {
        console.log(schedule);
    }, [schedule]);

    return (
        <>
            <Stack.Screen
                options={{
                    title: `Pridėti naują grafiką`
                }}
            />
            <GestureHandlerRootView>
                <ScrollView>
                    <View style={[styles.container, {backgroundColor: containerColor}]}>
                        <RepeatNav repeat={schedule.repeat} setRepeat={changeRepeat} />
                        {
                            schedule.repeat ?
                            <ScheduleRepeat
                                setWeeklySchedule={setWeeklySchedule}
                                setBiWeeklySchedule={setBiWeeklySchedule}
                            />
                            :
                            <ScheduleOneTime />
                        }
                        <TouchableOpacity style={[styles.saveButton, {backgroundColor: tabActiveColor}]} activeOpacity={0.7}>
                            <Text style={[styles.saveButtonText, {color}]}>Išsaugoti</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </GestureHandlerRootView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 20,
        padding: 20,
        gap: 20,
        height: '100%',
    },
    saveButton: {
        flex: 1,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    saveButtonText: {
        fontSize: 16,
    }
});