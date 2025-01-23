import { findClosestWeekdayDate, findClosestMonthDay, calculateDaysUntil } from "./scheduleUtils";

describe('calculateDaysUntil', () => {

    const mockDate = (isoDate: string) => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date(isoDate));
    };

    afterEach(() => {
        jest.useRealTimers();
    });

    test('returns the correct number of days for a future date', () => {
        mockDate('2025-01-01');
        const targetDate = new Date('2025-01-10');
        const result = calculateDaysUntil(targetDate);
        expect(result).toBe(9);
    });

    test('returns 0 days when the target date is today', () => {
        mockDate('2025-01-01');
        const targetDate = new Date('2025-01-01');
        const result = calculateDaysUntil(targetDate);
        expect(result).toBe(0);
    });

    test('returns a negative number for a past date', () => {
        mockDate('2025-01-01');
        const targetDate = new Date('2024-12-31');
        const result = calculateDaysUntil(targetDate);
        expect(result).toBe(-1);
    });
});

describe('findClosestWeekDay', () => {

    const startDate = new Date('2025-01-01');

    test('returns closest weekday from array', () => {
        const weekdays = [0, 4]; // pr, pn
        const result = findClosestWeekdayDate(weekdays, startDate);
        const expectedDate = new Date('2025-01-03');
        expect(result).toEqual(expectedDate);
    });

    test('returns closest weekday from array of 1 item', () => {
        const weekdays = [5]; // št
        const result = findClosestWeekdayDate(weekdays, startDate);
        const expectedDate = new Date('2025-01-04');
        expect(result).toEqual(expectedDate);
    });

    test('returns closest weekday if it is today', () => {
        const weekdays = [2]; // tr
        const result = findClosestWeekdayDate(weekdays, startDate);
        const expectedDate = new Date('2025-01-01');
        expect(result).toEqual(expectedDate);
    });
});

describe('findClosestMonthDay', () => {
    const startDate = new Date('2025-01-10');

    test('returns closest day this month', () => {
        const days = [20];
        const result = findClosestMonthDay(days, startDate);
        const expectedDate = new Date('2025-01-20');
        expect(result).toEqual(expectedDate);
    });

    test('returns closest day which is today', () => {
        const days = [10];
        const result = findClosestMonthDay(days, startDate);
        const expectedDate = new Date('2025-01-10');
        expect(result).toEqual(expectedDate);
    });

    test('returns closest day in next month', () => {
        const days = [5];
        const result = findClosestMonthDay(days, startDate);
        const expectedDate = new Date('2025-02-05');
        expect(result).toEqual(expectedDate);
    });
});