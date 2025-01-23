import { WeekPattern } from "@/types/schedule";

export const getSentenceWeekly = (weekdays: number[]) => {
    const days = ['pirmadienį', 'antradienį', 'trečiadienį', 'ketvirtadienį', 'penktadienį', 'šeštadienį', 'sekmadienį'];
    let sentence = 'kiekvieną';

    const weekdayCount = weekdays.length;
    weekdays.forEach((day, index) => {
        if (index > 0) {
            if (index+1 === weekdayCount)
                sentence += ' ir';
            else
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
    
    const weekdayCount = weekdays.length;
    weekdays.forEach((day, index) => {
        if (index > 0) {
            if (index+1 === weekdayCount)
                sentence += ' ir';
            else
                sentence += ',';
        }
        sentence += ' ' + days[day];
    });

    return sentence;
}

export const getSentenceMonthly = (days: number[]) => {
    let sentence = 'mėnesio';
    const dayCount = days.length;
    days.forEach((day, index) => {
        if (index > 0) {
            if (index+1 === dayCount)
                sentence += ' ir';
            else
                sentence += ',';
        }
        sentence += ' ' + day;
    });
    if (dayCount > 1) {
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

    weekPatterns.forEach((week, i) => {
        week.weekdays.forEach((day, j) => {
            if (i > 0 || j > 0) {
                if (j+1 === week.weekdays.length && i+1 === weekPatterns.length)
                    sentence += ' ir';
                else
                    sentence += ',';
            }
            sentence += ' ' + weekNumber[week.week] + ' ' + days[(day+7-1)%7];
        });
    });

    return sentence;
}
