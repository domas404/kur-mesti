import { ScheduleItem } from "@/types/schedule";

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
