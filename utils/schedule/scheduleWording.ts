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

export const getWidgetHeaderText = (daysUntil: number) => {
    let text = 'Atliekų išvežimas';

    if (daysUntil > 1)
        text += ' po';

    return text + ':';
}

export const getWidgetDaysUntilText = (daysUntil: number) => {
    let text = daysUntil + ' dienų';

    if (daysUntil < 0) {
        text = 'Nenustatyta';
    } else if (daysUntil === 0) {
        text = 'Šiandien';
    } else if (daysUntil === 1) {
        text = 'Rytoj';
    } else if (daysUntil % 10 === 1 && daysUntil !== 11) {
        text = daysUntil + ' dienos';
    }
    return text;
}

export const getWidgetDateText = (date: string, weekday: number) => {
    const weekdays = ['Sekmadienis', 'Pirmadienis', 'Antradienis', 'Trečiadienis', 'Ketvirtadienis', 'Penktadienis', 'Šeštadienis'];
    let text = '';
    
    if (date !== '') {
        text = date + ' ' + weekdays[weekday];
    } else {
        text = '--/--';
    }
    return text;
}
