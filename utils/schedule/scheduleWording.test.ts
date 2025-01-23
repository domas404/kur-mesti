import { getSentenceWeekly, getSentenceBiWeekly, getSentenceMonthly, getSentenceMonthlyByWeekdays } from "./scheduleWording";

describe('getSentenceWeekly', () => {

    test('wording of weekly schedule', () => {
        const weekdays = [0, 5];
        const result = getSentenceWeekly(weekdays);
        expect(result).toMatch('kiekvieną pirmadienį ir šeštadienį');
    });

    test('wording of weekly schedule', () => {
        const weekdays = [1];
        const result = getSentenceWeekly(weekdays);
        expect(result).toMatch('kiekvieną antradienį');
    });

    test('wording of weekly schedule', () => {
        const weekdays = [2, 3, 4];
        const result = getSentenceWeekly(weekdays);
        expect(result).toMatch('kiekvieną trečiadienį, ketvirtadienį ir penktadienį');
    });
});

describe('getSentenceBiWeekly', () => {

    test('wording of bi-weekly schedule', () => {
        const weekdays = [0, 5];
        const result = getSentenceBiWeekly(weekdays, 2);
        expect(result).toMatch('kas antrą pirmadienį ir šeštadienį');
    });

    test('wording of bi-weekly schedule', () => {
        const weekdays = [1];
        const result = getSentenceBiWeekly(weekdays, 1);
        expect(result).toMatch('kiekvieną antradienį');
    });

    test('wording of bi-weekly schedule', () => {
        const weekdays = [2, 3, 4];
        const result = getSentenceBiWeekly(weekdays, 4);
        expect(result).toMatch('kas ketvirtą trečiadienį, ketvirtadienį ir penktadienį');
    });
});

describe('getSentenceMonthly', () => {

    test('wording of monthly schedule', () => {
        const days = [1, 20];
        const result = getSentenceMonthly(days);
        expect(result).toMatch('mėnesio 1 ir 20 dienomis');
    });

    test('wording of monthly schedule', () => {
        const days = [22];
        const result = getSentenceMonthly(days);
        expect(result).toMatch('mėnesio 22 dieną');
    });

    test('wording of monthly schedule', () => {
        const days = [3, 12, 27];
        const result = getSentenceMonthly(days);
        expect(result).toMatch('mėnesio 3, 12 ir 27 dienomis');
    });
});

describe('getSentenceMonthlyByWeekdays', () => {

    test('wording of monthly by weekdays schedule', () => {
        const weekPattern = [{ week: 0, weekdays: [2, 4] }];
        const result = getSentenceMonthlyByWeekdays(weekPattern);
        expect(result).toMatch('kiekvieno mėnesio pirmą antradienį ir pirmą ketvirtadienį');
    });

    test('wording of monthly by weekdays schedule', () => {
        const weekPattern = [{ week: 0, weekdays: [1] }, { week: 1, weekdays: [2] }];
        const result = getSentenceMonthlyByWeekdays(weekPattern);
        expect(result).toMatch('kiekvieno mėnesio pirmą pirmadienį ir antrą antradienį');
    });

    test('wording of monthly by weekdays schedule', () => {
        const weekPattern = [{ week: 0, weekdays: [1, 3] }, { week: 3, weekdays: [2] }];
        const result = getSentenceMonthlyByWeekdays(weekPattern);
        expect(result).toMatch('kiekvieno mėnesio pirmą pirmadienį, pirmą trečiadienį ir ketvirtą antradienį');
    });

    test('wording of monthly by weekdays schedule', () => {
        const weekPattern = [{ week: 0, weekdays: [1] }, { week: 2, weekdays: [3, 5] }];
        const result = getSentenceMonthlyByWeekdays(weekPattern);
        expect(result).toMatch('kiekvieno mėnesio pirmą pirmadienį, trečią trečiadienį ir trečią penktadienį');
    });

    test('wording of monthly by weekdays schedule', () => {
        const weekPattern = [{ week: 1, weekdays: [1, 2] }, { week: 3, weekdays: [5, 0] }];
        const result = getSentenceMonthlyByWeekdays(weekPattern);
        expect(result).toMatch('kiekvieno mėnesio antrą pirmadienį, antrą antradienį, ketvirtą penktadienį ir ketvirtą sekmadienį');
    });
});