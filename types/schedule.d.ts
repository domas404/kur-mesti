export type RepeatPattern = 'weekly' | 'bi-weekly' | 'monthly' | 'monthly-by-weekdays';

export type WeekPattern = {
    week: number;
    weekdays: number[];
}

export type ScheduleItem = {
    id: string;
    repeat: boolean | undefined;
    closestDate: string | undefined;
    // lastUpdate: string | undefined;

    repeatPattern?: RepeatPattern;
    weekdays?: number[];
    interval?: number;
    startDate?: string;
    days?: number[];
    weekPattern?: WeekPattern[];
}