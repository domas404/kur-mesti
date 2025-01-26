import { useCallback, useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

import { RepeatPattern, ScheduleItem, WeekPattern } from "@/types/schedule";
import { findClosestWeekdayDate, findClosestMonthDay, findClosestMonthDayByWeekdays } from "@/utils/schedule/scheduleUtils";

export function useSchedule(initialSchedule: ScheduleItem) {
    const [schedule, setSchedule] = useState<ScheduleItem>(initialSchedule);
    const [loaded, setLoaded] = useState(false);

    const changeRepeat = useCallback((repeat: boolean) => {
        setSchedule(prevSchedule => ({
            ...prevSchedule,
            weekdays: undefined,
            repeat: repeat
        }));
    }, []);

    const setOneTimeSchedule = useCallback((date: Date) => {
        const newSchedule: ScheduleItem = {
            id: schedule.id,
            repeat: false,
            closestDate: date.toString()
        }
        setSchedule(newSchedule);
    }, []);

    const setWeeklySchedule = useCallback((selectedWeekdays: number[]) => {

        // console.log('setWeeklySchedule called');
    
        if (selectedWeekdays.length > 0) {
            const today = new Date();
            const closestDate = findClosestWeekdayDate(selectedWeekdays, today);
    
            setSchedule(prevSchedule => ({
                ...prevSchedule,
                repeatPattern: 'weekly',
                weekdays: selectedWeekdays,
                closestDate: closestDate.toString()
            }));
        }
    }, []);

    const setBiWeeklySchedule = useCallback((selectedWeekdays: number[], interval: number, startDate: Date) => {
        if (selectedWeekdays.length > 0) {
            const closestDate = findClosestWeekdayDate(selectedWeekdays, startDate);
    
            setSchedule(prevSchedule => ({
                ...prevSchedule,
                interval: interval,
                repeatPattern: 'bi-weekly',
                weekdays: selectedWeekdays,
                closestDate: closestDate.toString(),
                startDate: startDate.toString()
            }));
        }
    }, []);

    const setMonthlySchedule = useCallback((selectedDays: number[]) => {
    
        if (selectedDays.length > 0) {
            const today = new Date();

            const selectedDaysAdjusted = selectedDays.map((day) => {
                return (day+1);
            });

            const closestDate = findClosestMonthDay(selectedDaysAdjusted, today);

            setSchedule(prevSchedule => ({
                ...prevSchedule,
                repeatPattern: 'monthly',
                days: selectedDaysAdjusted,
                closestDate: closestDate.toString(),
            }));
        }
    }, []);

    const setMonthlyScheduleByWeekday = useCallback((weekPattern: WeekPattern[]) => {
    
        if (weekPattern.length > 0) {

            const today = new Date();

            const closestDate = findClosestMonthDayByWeekdays(weekPattern, today);

            setSchedule(prevSchedule => ({
                ...prevSchedule,
                repeatPattern: 'monthly-by-weekdays',
                closestDate: closestDate.toString(),
                weekPattern: weekPattern
            }));
        }
    }, []);

    const setRepeatPattern = useCallback((repeatPattern: RepeatPattern) => {
        setSchedule(prevSchedule => ({
            ...prevSchedule,
            repeatPattern: repeatPattern
        }));
    }, []);

    useEffect(() => {
        // console.log('useEffect called');
        setLoaded(false);
        const setScheduleData = async () => {
            const storage = await AsyncStorage.getItem('schedule');
            if (storage) {
                const scheduleObjectList: ScheduleItem[] = await JSON.parse(storage) as ScheduleItem[];
                const scheduleToEdit: ScheduleItem = scheduleObjectList.find((item) => item.id === schedule.id)!;
                // console.log('schedule to edit', schedule.id, scheduleToEdit);
                if (scheduleToEdit) {
                    // console.log("closestDate: ", scheduleToEdit.closestDate);
                    setSchedule(scheduleToEdit);
                }
            }
        }
        // console.log('initiate new schedule:', schedule);
        setScheduleData();
    }, []);

    useEffect(() => {
        setLoaded(true);
    }, [schedule]);

    const saveSchedule = async () => {
        const scheduleList = await AsyncStorage.getItem('schedule');
        if (scheduleList) {
            const updatedSchedules: ScheduleItem[] = JSON.parse(scheduleList);
            const scheduleToChange = updatedSchedules.findIndex((item) => item.id === schedule.id);
            if (scheduleToChange > -1) {
                updatedSchedules[scheduleToChange] = schedule;
            } else {
                updatedSchedules.push(schedule);
            }
            await AsyncStorage.setItem('schedule', JSON.stringify(updatedSchedules));
        } else {
            const newScheduleList = [schedule];
            await AsyncStorage.setItem('schedule', JSON.stringify(newScheduleList));
        }
        ToastAndroid.show('Schedule created', ToastAndroid.SHORT);
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
