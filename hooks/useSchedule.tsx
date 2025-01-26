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
        setSchedule(prevSchedule => {
            if (prevSchedule) {
                return {
                    ...prevSchedule,
                    repeat: repeat
                }
            } else {
                return {
                    id: id,
                    closestDate: undefined,
                    repeat: repeat
                }
            }
        });
    }, []);

    const setOneTimeSchedule = useCallback((date: Date) => {
        // console.log('schedule', schedule);
        // console.log(date);
        setSchedule(prevScheudle => {
            if (prevScheudle) {
                return {
                    ...prevScheudle,
                    repeat: false,
                    closestDate: date.toString()
                }
            } else {
                return {
                    id: id,
                    repeat: false,
                    closestDate: date.toString()
                }
            }
        });
    }, []);

    const setWeeklySchedule = useCallback((selectedWeekdays: number[]) => {

        // console.log('setWeeklySchedule called');
    
        if (selectedWeekdays.length > 0) {
            const today = new Date();
            const closestDate = findClosestWeekdayDate(selectedWeekdays, today);
    
            setSchedule(prevSchedule => {
                if (prevSchedule) {
                    return {
                        ...prevSchedule,
                        repeatPattern: 'weekly',
                        weekdays: selectedWeekdays,
                        closestDate: closestDate.toString()
                    }
                } else {
                    return {
                        id: id,
                        repeat: true,
                        repeatPattern: 'weekly',
                        weekdays: selectedWeekdays,
                        closestDate: closestDate.toString()
                    }
                }
            });
        }
    }, []);

    const setBiWeeklySchedule = useCallback((selectedWeekdays: number[], interval: number, startDate: Date) => {
        if (selectedWeekdays.length > 0) {
            const closestDate = findClosestWeekdayDate(selectedWeekdays, startDate);
    
            setSchedule(prevSchedule => {
                if (prevSchedule) {
                    return {
                        ...prevSchedule,
                        interval: interval,
                        repeatPattern: 'bi-weekly',
                        weekdays: selectedWeekdays,
                        closestDate: closestDate.toString(),
                        startDate: startDate.toString()
                    }
                } else {
                    return {
                        id: id,
                        repeat: true,
                        interval: interval,
                        repeatPattern: 'bi-weekly',
                        weekdays: selectedWeekdays,
                        closestDate: closestDate.toString(),
                        startDate: startDate.toString()
                    }
                }
            });
        }
    }, []);

    const setMonthlySchedule = useCallback((selectedDays: number[]) => {
    
        if (selectedDays.length > 0) {
            const today = new Date();

            const selectedDaysAdjusted = selectedDays.map((day) => {
                return (day+1);
            });

            const closestDate = findClosestMonthDay(selectedDaysAdjusted, today);

            setSchedule(prevSchedule => {
                if (prevSchedule) {
                    return {
                        ...prevSchedule,
                        repeatPattern: 'monthly',
                        days: selectedDaysAdjusted,
                        closestDate: closestDate.toString(),
                    }    
                } else {
                    return {
                        id: id,
                        repeat: true,
                        repeatPattern: 'monthly',
                        days: selectedDaysAdjusted,
                        closestDate: closestDate.toString(),
                    }
                }
            });
        }
    }, []);

    const setMonthlyScheduleByWeekday = useCallback((weekPattern: WeekPattern[]) => {
    
        if (weekPattern.length > 0) {

            const today = new Date();

            const closestDate = findClosestMonthDayByWeekdays(weekPattern, today);

            setSchedule(prevSchedule => {
                if (prevSchedule) {
                    return {
                        ...prevSchedule,
                        repeatPattern: 'monthly-by-weekdays',
                        closestDate: closestDate.toString(),
                        weekPattern: weekPattern
                    }
                } else {
                    return {
                        id: id,
                        repeat: true,
                        repeatPattern: 'monthly-by-weekdays',
                        closestDate: closestDate.toString(),
                        weekPattern: weekPattern
                    }
                }
            });
        }
    }, []);

    const setRepeatPattern = useCallback((repeatPattern: RepeatPattern) => {
        setSchedule(prevSchedule => {
            if (prevSchedule) {
                return {
                    ...prevSchedule,
                    repeatPattern: repeatPattern
                }
            } else {
                return {
                    id: id,
                    repeat: true,
                    repeatPattern: repeatPattern,
                    closestDate: undefined
                }
            }
        });
    }, []);

    useEffect(() => {
        // console.log('useEffect called');
        // console.log('id:', id);
        setLoaded(false);
        const setScheduleData = async () => {
            const storage = await AsyncStorage.getItem('schedule');
            if (storage) {
                const scheduleObjectList: ScheduleItem[] = await JSON.parse(storage) as ScheduleItem[];
                const scheduleToEdit: ScheduleItem | undefined = scheduleObjectList.find((item) => item.id === id);
                // console.log('schedule to edit', schedule.id, scheduleToEdit);
                if (scheduleToEdit) {
                    // console.log("closestDate: ", scheduleToEdit.closestDate);
                    setSchedule(scheduleToEdit);
                } else {
                    setSchedule({ id: id, closestDate: undefined, repeat: undefined });
                }
            }
        }
        // console.log('initiate new schedule:', schedule);
        setScheduleData();
    }, []);

    useEffect(() => {
        if (schedule) {
            // console.log("schedule loaded");
            // console.log(schedule);
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
