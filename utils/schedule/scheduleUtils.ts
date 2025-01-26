import { useSchedule } from "@/hooks/useSchedule";
import { ScheduleItem, WeekPattern } from "@/types/schedule";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const sortScheduleList = (scheduleList: ScheduleItem[]) => {
    scheduleList.sort((a, b) => {
        const closestDateA = new Date(a.closestDate!);
        const daysUntilA = calculateDaysUntil(closestDateA);
        const closestDateB = new Date(b.closestDate!);
        const daysUntilB = calculateDaysUntil(closestDateB);
        return daysUntilA - daysUntilB;
    });
    return scheduleList;
}

export const getScheduleFromLocalStorage = async () => {
    const storage = await AsyncStorage.getItem('schedule');
    if (storage && storage !== '[]') {
        const scheduleObjectList: ScheduleItem[] = await JSON.parse(storage) as ScheduleItem[];
        sortScheduleList(scheduleObjectList);
        return scheduleObjectList[0];
    } else {
        return undefined;
    }
}

export const updateClosestDates = async (storage: string, today: Date) => {

    if (storage && storage !== '[]') {
        const scheduleObjectList: ScheduleItem[] = await JSON.parse(storage) as ScheduleItem[];

        const mappedScheduleObjectList = scheduleObjectList.map((item) => {
            if (item.repeat) {
                switch(item.repeatPattern) {
                    case 'weekly':
                        return {
                            ...item,
                            closestDate: findClosestWeekdayDate(item.weekdays!, today).toString()
                        };
                    case 'bi-weekly':
                        return {
                            ...item,
                            closestDate: findClosestWeekdayDate(item.weekdays!, new Date(item.startDate!)).toString()
                        }
                    case 'monthly':
                        const daysAdjusted = item.days!.map((day) => {
                            return (day+1);
                        });
                        return {
                            ...item,
                            closestDate: findClosestMonthDay(daysAdjusted, today).toString()
                        }
                    case 'monthly-by-weekdays':
                        return {
                            ...item,
                            closestDate: findClosestMonthDayByWeekdays(item.weekPattern!, today).toString()
                        }
                }
            } else {
                return item;
            }
        });

        return mappedScheduleObjectList;

    } else {
        return undefined;
    }
}

export const storageUpToDate = (storedDateString: string) => {
    const storedDate = new Date(storedDateString);
    const storedDateUTC = new Date(Date.UTC(storedDate.getUTCFullYear(), storedDate.getUTCMonth(), storedDate.getUTCDate()));
    const today = new Date();
    const todayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
    if (storedDateUTC.getTime() < todayUTC.getTime()) {
        return false;
    } else {
        return true;
    }
}

export const calculateDaysUntil = (targetDate: Date) => {
    const today = new Date();
    const timeDifference = targetDate.getTime() - today.getTime();
    const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return dayDifference;
}

// returns the date of the closest selected weekday from the start date
export const findClosestWeekdayDate = (selectedWeekdays: number[], startDate: Date) => {
    const newDate = new Date(startDate);
    
    const selectedWeekdaysAdjusted = selectedWeekdays.map((weekday) => {
        return (weekday+1)%7; // start week at sunday
    });
    
    const daysUntilSelectedWeekdays = selectedWeekdaysAdjusted.map((weekday) => {
        return ((weekday+7)-startDate.getDay())%7;
    });
    
    const daysUntilClosestWeekday = Math.min(...daysUntilSelectedWeekdays);
    newDate.setDate(startDate.getDate() + daysUntilClosestWeekday);
    
    return newDate;
}

// returns the date of the closest selected day of the month from the start date
export const findClosestMonthDay = (selectedDays: number[], startDate: Date) => {

    const closestDates: Date[] = [];
    
    selectedDays.forEach((day) => {
        if (day < startDate.getDate()) { // if day already occured this month, get this day from the next month
            const newDate = new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDay()));
            newDate.setMonth(startDate.getMonth()+1);
            newDate.setDate(day);
            closestDates.push(newDate);
        } else {
            const newDate = new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDay()));
            newDate.setDate(day);
            closestDates.push(newDate);
        }
    });

    const closestDateTimes = closestDates.map((date) => date.getTime());
    const closestDate = closestDates[closestDateTimes.indexOf(Math.min(...closestDateTimes))];
    
    return closestDate;
}

export const findClosestMonthDayByWeekdays = (weekPattern: WeekPattern[], today: Date) => {
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
    return closestDate;
}