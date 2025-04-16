import { useCallback, useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

import { RepeatPattern, ScheduleItem, WeekPattern } from "@/types/schedule";
import { findClosestWeekdayDate, findClosestMonthDay, findClosestMonthDayByWeekdays } from "@/utils/schedule/scheduleUtils";

export function useSchedule(id: string) {
    const [schedule, setSchedule] = useState<ScheduleItem | undefined>(undefined);
    const [loaded, setLoaded] = useState(false);

    const changeRepeat = useCallback((repeat: boolean) => {
        setSchedule({
            id: id,
            repeat: repeat,
            closestDate: undefined,
        });
    }, [id]);

    const setOneTimeSchedule = useCallback((date: Date) => {
        setSchedule({
            id: id,
            repeat: false,
            closestDate: date.toString()
        });
    }, [id]);

    const setWeeklySchedule = useCallback((selectedWeekdays: number[]) => {
        if (selectedWeekdays.length > 0) {
            const today = new Date();
            const closestDate = findClosestWeekdayDate(selectedWeekdays, today);
            setSchedule({
                id: id,
                repeat: true,
                repeatPattern: 'weekly',
                weekdays: selectedWeekdays,
                closestDate: closestDate.toString()
            });
        }
    }, [id]);

    const setBiWeeklySchedule = useCallback((selectedWeekdays: number[], interval: number, startDate: Date) => {
        if (selectedWeekdays.length > 0) {
            const closestDate = findClosestWeekdayDate(selectedWeekdays, startDate);
            setSchedule({
                id: id,
                repeat: true,
                interval: interval,
                repeatPattern: 'bi-weekly',
                weekdays: selectedWeekdays,
                closestDate: closestDate.toString(),
                startDate: startDate.toString()
            });
        }
    }, [id]);

    const setMonthlySchedule = useCallback((selectedDays: number[]) => {
        if (selectedDays.length > 0) {
            const today = new Date();
            const selectedDaysAdjusted = selectedDays.map((day) => {
                return (day+1);
            });
            const closestDate = findClosestMonthDay(selectedDaysAdjusted, today);
            setSchedule({
                id: id,
                repeat: true,
                repeatPattern: 'monthly',
                days: selectedDaysAdjusted,
                closestDate: closestDate.toString(),
            });
        }
    }, [id]);

    const setMonthlyScheduleByWeekday = useCallback((weekPattern: WeekPattern[]) => {
        if (weekPattern.length > 0) {
            const today = new Date();
            const closestDate = findClosestMonthDayByWeekdays(weekPattern, today);
            setSchedule({
                id: id,
                repeat: true,
                repeatPattern: 'monthly-by-weekdays',
                closestDate: closestDate.toString(),
                weekPattern: weekPattern
            });
        }
    }, [id]);

    const setRepeatPattern = useCallback((repeatPattern: RepeatPattern) => {
        setSchedule({
            id: id,
            repeat: true,
            repeatPattern: repeatPattern,
            closestDate: undefined
        });
    }, [id]);

    useEffect(() => {
        setLoaded(false);
        const setScheduleData = async () => {
            const storage = await AsyncStorage.getItem('schedule');
            if (storage) {
                const scheduleObjectList: ScheduleItem[] = await JSON.parse(storage) as ScheduleItem[];
                const scheduleToEdit: ScheduleItem | undefined = scheduleObjectList.find((item) => item.id === id);
                if (scheduleToEdit) {
                    setSchedule(scheduleToEdit);
                } else {
                    setSchedule({ id: id, closestDate: undefined, repeat: undefined });
                }
            } else {
                setSchedule({ id: id, closestDate: undefined, repeat: undefined });
            }
        }
        setScheduleData();
    }, [id]);

    useEffect(() => {
        if (schedule) {
            setLoaded(true);
        }
    }, [schedule]);

    const saveSchedule = async () => {
        const scheduleList = await AsyncStorage.getItem('schedule');
        if (scheduleList) {
            const updatedSchedules: ScheduleItem[] = JSON.parse(scheduleList);
            const scheduleToChange = updatedSchedules.findIndex((item) => item.id === schedule?.id);
            if (scheduleToChange > -1) {
                updatedSchedules[scheduleToChange] = schedule!;
            } else {
                updatedSchedules.push(schedule!);
            }
            await AsyncStorage.setItem('schedule', JSON.stringify(updatedSchedules));
        } else {
            const newScheduleList = [schedule];
            await AsyncStorage.setItem('schedule', JSON.stringify(newScheduleList));
        }
        ToastAndroid.show('Grafikas išsaugotas', ToastAndroid.SHORT);
        router.replace('../');
    }

    return {
        schedule,
        changeRepeat,
        setOneTimeSchedule,
        setWeeklySchedule,
        setBiWeeklySchedule,
        setMonthlySchedule,
        setMonthlyScheduleByWeekday,
        loaded,
        setRepeatPattern,
        saveSchedule
    }
}
