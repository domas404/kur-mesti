import { WeekPattern } from "@/types/schedule";

export const calculateDaysUntil = (targetDate: Date) => {
    const today = new Date();
    const timeDifference = targetDate.getTime() - today.getTime();
    const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return dayDifference;
}

export const getSentenceWeekly = (weekdays: number[]) => {
    const days = ['pirmadienį', 'antradienį', 'trečiadienį', 'ketvirtadienį', 'penktadienį', 'šeštadienį', 'sekmadienį'];
    let sentence = 'kiekvieną';
    weekdays.forEach((day, index) => {
        if (index > 0) {
            sentence += ',';
        }
        sentence += ' ' + days[day];
    });
    return sentence;
}

export const getSentenceBiWeekly = (weekdays: number[], interval: number) => {
    const days = ['pirmadienį', 'antradienį', 'trečiadienį', 'ketvirtadienį', 'penktadienį', 'šeštadienį', 'sekmadienį'];
    const intervals = ['kiekvieną', 'kas antrą', 'kas trečią', 'kas ketvirtą', 'kas penktą', 'kas šeštą', 'kas setintą', 'kas aštuntą', 'kas devintą'];
    let sentence = intervals[interval!-1];
    weekdays.forEach((day, index) => {
        if (index > 0) {
            sentence += ',';
        }
        sentence += ' ' + days[day];
    });
    return sentence;
}

export const getSentenceMonthly = (days: number[]) => {
    let sentence = 'mėnesio';
    days.forEach((day, index) => {
        if (index > 0) {
            sentence += ',';
        }
        sentence += ' ' + day;
        if (day%10 === 1 || day%10 === 2) {
            sentence += '-ą';
        } else if (day%10 === 3) {
            sentence += '-ią';
        } else {
            sentence += '-tą';
        }
        
    });
    if (days.length > 1) {
        sentence += ' dienomis';
    } else {
        sentence += ' dieną';
    }
    return sentence;
}

export const getSentenceMonthlyByWeekdays = (weekPatterns: WeekPattern[]) => {
    const days = ['pirmadienį', 'antradienį', 'trečiadienį', 'ketvirtadienį', 'penktadienį', 'šeštadienį', 'sekmadienį'];
    const weekNumber = ['pirmą', 'antrą', 'trečią', 'ketvirtą'];
    let sentence = 'kiekvieno mėnesio';
    // console.log(weekPatterns);
    weekPatterns.forEach((week, i) => {
        if (i > 0) {
            sentence += ',';
        }
        week.weekdays.forEach((day, j) => {
            if (j > 0) {
                sentence += ',';
            }
            sentence += ' ' + weekNumber[week.week] + ' ' + days[(day+7-1)%7];
        });
    })
    return sentence;
}

export const findClosestDay = (selectedWeekdays: number[], startDate: Date) => {
    const selectedWeekdaysAdjusted = selectedWeekdays.map((weekday) => {
        return (weekday+1)%7;
    });

    const closestWeekdays = selectedWeekdaysAdjusted.map((weekday) => {
        return ((weekday+7)-startDate.getDay())%7;
    });

    const closestDay = Math.min(...closestWeekdays);

    return closestDay;
}

export const findClosestMonthDay = (selectedDays: number[], startDate: Date) => {

    const closestDates: Date[] = [];

    selectedDays.forEach((day) => {
        if (day < startDate.getDate()) {
            const newDate = new Date();
            newDate.setMonth(startDate.getMonth()+1);
            newDate.setDate(day);
            closestDates.push(newDate);
        } else {
            const newDate = new Date();
            newDate.setDate(day);
            closestDates.push(newDate);
        }
    });

    const closestDateTimes = closestDates.map((date) => date.getTime());
    const closestDate = closestDates[closestDateTimes.indexOf(Math.min(...closestDateTimes))];

    return closestDate;
}

export const calculateClosestDate = (date: Date, days: number) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
}