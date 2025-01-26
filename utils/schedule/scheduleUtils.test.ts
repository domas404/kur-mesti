import { ScheduleItem } from "@/types/schedule";
import { findClosestWeekdayDate, findClosestMonthDay, calculateDaysUntil, updateClosestDates, sortScheduleList, storageUpToDate } from "./scheduleUtils";
import AsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

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

describe('findClosestWeekdayDate', () => {

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

describe('updateClosestDates', () => {
    const mockDate = (isoDate: string) => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date(isoDate));
    };

    afterEach(() => {
        jest.useRealTimers();
    });

    const setupLocalStorage = async () => {
        // mockDate('2025-01-24');
        const date = new Date('2025-01-29');
        const schedule = [{
            id: '1',
            repeat: true,
            repeatPattern: 'weekly',
            weekdays: [2],
            closestDate: date.toString()
        }];
        await AsyncStorage.setItem("schedule", JSON.stringify(schedule));
    }

    const updateSchedules = async () => {
        const today = new Date();
        console.log(today);
        const storage = await AsyncStorage.getItem('schedule');
        console.log("storage:", storage);
        const updatedDates = await updateClosestDates(storage!, today);
        console.log("updated storage", JSON.stringify(updatedDates));
        await AsyncStorage.setItem('schedule', JSON.stringify(updatedDates));
    }

    const getScheduleFromLocalStorage = async () => {
        const storage = await AsyncStorage.getItem('schedule');
        if (storage && storage !== '[]') {
            const scheduleObjectList: ScheduleItem[] = await JSON.parse(storage) as ScheduleItem[];
            sortScheduleList(scheduleObjectList);
            return scheduleObjectList[0];
        } else {
            return undefined;
        }
    }

    const getClosestScheduleDaysUntil = async () => {
        const closestSchedule = await getScheduleFromLocalStorage();
        const daysUntil = calculateDaysUntil(new Date(closestSchedule!.closestDate!));
        return daysUntil;
    }

    test('returns the correct number of days for a future date', async () => {

        await setupLocalStorage();
        
        mockDate('2025-01-24');
        const daysUntilA = await getClosestScheduleDaysUntil();
        console.log("today:", new Date());

        mockDate('2025-01-30');
        console.log("today:", new Date());
        await updateSchedules();

        const daysUntilB = await getClosestScheduleDaysUntil();

        expect([daysUntilA, daysUntilB]).toEqual([5, 6]);
    });
});

describe('', () => {
    const mockDate = (isoDate: string) => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date(isoDate));
    };

    afterEach(() => {
        jest.useRealTimers();
    });

    test('returns the correct number of days for a future date', async () => {
        
        mockDate('2025-01-01');
        await AsyncStorage.setItem('scheduleLastUpdate', (new Date()).toString());
        const storedDateStringA = await AsyncStorage.getItem('scheduleLastUpdate');
        const upToDateA = storageUpToDate(storedDateStringA!);

        mockDate('2025-01-02');
        // await AsyncStorage.setItem('scheduleLastUpdate', (new Date()).toString());
        const storedDateStringB = await AsyncStorage.getItem('scheduleLastUpdate');
        const upToDateB = storageUpToDate(storedDateStringB!);

        // mockDate('2025-01-02');
        // const targetDate = new Date('2025-01-10');
        // const result = calculateDaysUntil(targetDate);
        expect([upToDateA, upToDateB]).toEqual([true, false]);
    });

});

