export type WeekPattern = {
    week: number;
    weekdays: number[];
}

export type ScheduleItem = {
    id: string;
    repeat: boolean;
    closestDate: string | undefined;

    period?: 'weekly' | 'bi-weekly' | 'monthly' | 'monthly-by-weekdays';
    weekdays?: number[];
    interval?: number;
    startDate?: string;
    days?: number[];
    weekPattern?: WeekPattern[];
}