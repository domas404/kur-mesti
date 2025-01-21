import RepeatNav from "@/components/settings/schedule/RepeatNav";
import ScheduleOneTime from "@/components/settings/schedule/ScheduleOneTime";
import ScheduleRepeat from "@/components/settings/schedule/ScheduleRepeat";
import { useThemeColor } from "@/hooks/useThemeColor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { useEffect, useId, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ToastAndroid } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { router } from "expo-router";
import { ScheduleItem, WeekPattern } from "@/types/schedule";
import { calculateClosestDate, findClosestDay, findClosestMonthDay } from "@/utils/scheduleUtils";

export default function Item() {

    const [containerColor, color, tabActiveColor] = useThemeColor(['container', 'text', 'tabActive']);

    const [schedule, setSchedule] = useState<ScheduleItem>({ id: useId(), repeat: false, closestDate: undefined });

    const changeRepeat = (repeat: boolean) => {
        setSchedule({
            ...schedule,
            weekdays: undefined,
            repeat: repeat
        })
    }

    const setOneTimeSchedule = (date: Date) => {
        const newSchedule: ScheduleItem = {
            id: schedule.id,
            repeat: false,
            closestDate: date.toString()
        }
        setSchedule(newSchedule);
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

    const setMonthlySchedule = (selectedDays: number[]) => {

        if (selectedDays.length > 0) {
            const today = new Date();

            const selectedDaysAdjusted = selectedDays.map((day) => {
                return (day+1);
            });

            const closestDate = findClosestMonthDay(selectedDaysAdjusted, today);

            setSchedule({
                ...schedule,
                period: 'monthly',
                days: selectedDaysAdjusted,
                closestDate: closestDate.toString(),
            });
        } else {
            const newSchedule: ScheduleItem = {
                id: schedule.id,
                period: schedule.period,
                repeat: true,
                closestDate: undefined
            }
            setSchedule(newSchedule);
        }
    }

    const setMonthlyScheduleByWeekday = (weekPattern: WeekPattern[]) => {

        if (weekPattern.length > 0) {

            const today = new Date();

            let closestDate = new Date();
            let dateFound = false;

            let i=0;
            let k=0;
            while (!dateFound) {
                const { week, weekdays } = weekPattern[i];
                const initialDate = new Date(Date.UTC(today.getFullYear(), today.getMonth()+k, (week*7)+1));
                
                for (let j=0; j<weekdays.length; j++) {
                    while (initialDate.getDay() !== weekdays[j]) {
                        initialDate.setDate(initialDate.getDate()+1);
                    }
                    if (initialDate.getTime() > today.getTime()) {
                        closestDate = initialDate;
                        dateFound = true;
                        break;
                    }
                }
                if (dateFound) {
                    break;
                } else if (i+1 === weekPattern.length) {
                    k=1;
                    i=0;
                } else {
                    i++;
                }
            }

            setSchedule({
                ...schedule,
                period: 'monthly-by-weekdays',
                closestDate: closestDate.toString(),
                weekPattern: weekPattern
            });
        }
    }

    // useEffect(() => {
    //     console.log(schedule);
    // }, [schedule]);

    const saveSchedule = async () => {
        const scheduleList = await AsyncStorage.getItem('schedule');
        if (scheduleList) {
            const updatedSchedules = JSON.parse(scheduleList);
            updatedSchedules.push(schedule);
            await AsyncStorage.setItem('schedule', JSON.stringify(updatedSchedules));
        } else {
            const newScheduleList = [schedule];
            await AsyncStorage.setItem('schedule', JSON.stringify(newScheduleList));
        }
        ToastAndroid.show('Schedule created', ToastAndroid.SHORT);
        router.replace('../');
    }

    return (
        <>
            <Stack.Screen
                options={{
                    title: `Pridėti naują grafiką`
                }}
            />
            <GestureHandlerRootView>
                <ScrollView contentContainerStyle={{paddingBottom: 100}}>
                    <View style={[styles.container, {backgroundColor: containerColor}]}>
                        <RepeatNav repeat={schedule.repeat} setRepeat={changeRepeat} />
                        {
                            schedule.repeat ?
                            <ScheduleRepeat
                                setWeeklySchedule={setWeeklySchedule}
                                setBiWeeklySchedule={setBiWeeklySchedule}
                                setMonthlySchedule={setMonthlySchedule}
                                setMonthlyScheduleByWeekday={setMonthlyScheduleByWeekday}
                            />
                            :
                            <ScheduleOneTime setOneTimeSchedule={setOneTimeSchedule} />
                        }
                        <TouchableOpacity
                            style={[styles.saveButton, {backgroundColor: tabActiveColor}]}
                            activeOpacity={0.7}
                            onPress={saveSchedule}
                        >
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