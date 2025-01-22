import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { useThemeColor } from "@/hooks/useThemeColor";
import { RepeatPattern, ScheduleItem, WeekPattern } from "@/types/schedule";
import RepeatWeekly from "./RepeatWeekly";
import RepeatBiWeekly from "./RepeatBiWeekly";
import RepeatMonthly from "./RepeatMonthly";
import RepeatMonthlyByWeekdays from "./RepeatMonthlyByWeekdays";

type RepeatPatternMap = {
    [key: string]: string
}

const repeatPatternMap: RepeatPatternMap = {
    'weekly': 'Kiekvieną savaitę',
    'bi-weekly': 'Kas n-tąją savaitę',
    'monthly': 'Kiekvieną mėnesį (pagal mėnesio dienas)',
    'monthly-by-weekdays': 'Kiekvieną mėnesį (pagal savaitės dienas)'
}

type Props = {
    setWeeklySchedule: (value: number[]) => void;
    setBiWeeklySchedule: (selectedWeekdays: number[], interval: number, startDate: Date) => void;
    setMonthlySchedule: (selectedDays: number[]) => void;
    setMonthlyScheduleByWeekday: (weekPattern: WeekPattern[]) => void;
    setRepeatPattern: (repeatPattern: RepeatPattern) => void;
    initialSchedule: ScheduleItem;
}

export default function ScheduleRepeat({
    setWeeklySchedule,
    setBiWeeklySchedule,
    setMonthlySchedule,
    setMonthlyScheduleByWeekday,
    setRepeatPattern,
    initialSchedule,
}: Props) {

    const [selectListVisible, setSelectListVisible] = useState<boolean>(false);
    const { container: backgroundColor, text: color, border } = useThemeColor();
    const { weekdays, interval, startDate, days, weekPattern, repeatPattern } = initialSchedule;

    const changeRepeatPattern = (id: RepeatPattern) => {
        setRepeatPattern(id);
        setSelectListVisible(false);
    }

    const mappedRepeatPatterns = Object.keys(repeatPatternMap).map((item, index) => {
        return (
            <TouchableOpacity
                key={`${item}-${index}`}
                style={styles.listItem}
                onPress={() => changeRepeatPattern(item as RepeatPattern)}
            >
                <Text style={[styles.listItemText, {color}]}>{repeatPatternMap[item]}</Text>
            </TouchableOpacity>
        );
    });

    return (
        <>
            <View>
                <Text style={[styles.containerLabel, {color}]}>Periodiškumas</Text>
                <TouchableOpacity
                    style={[styles.selectContainer, {backgroundColor, borderColor: border}]}
                    onPress={() => setSelectListVisible(!selectListVisible)}
                    activeOpacity={0.7}
                >
                    <Text style={[styles.selectedRepeatPatternText, {color}]} numberOfLines={1}>
                        {repeatPattern ? repeatPatternMap[repeatPattern] : 'Pasirinkti'}
                    </Text>
                    <Ionicons
                        style={styles.selectContainerIcon}
                        name={selectListVisible ? 'chevron-up-outline' : 'chevron-down-outline'}
                        size={24}
                        color={color}
                    />
                </TouchableOpacity>
                {
                    selectListVisible &&
                    <TouchableOpacity style={[styles.selectContainerList, {backgroundColor, borderColor: border}]}>
                        <TouchableOpacity>
                            {mappedRepeatPatterns}
                        </TouchableOpacity>
                    </TouchableOpacity>
                }
            </View>
            { repeatPattern === 'weekly' && <RepeatWeekly setWeeklySchedule={setWeeklySchedule} initialWeekdays={weekdays!} />}
            { repeatPattern === 'bi-weekly' && <RepeatBiWeekly setBiWeeklySchedule={setBiWeeklySchedule} initialWeekdays={weekdays!} initialInterval={interval!} initialDate={startDate!} /> }
            { repeatPattern === 'monthly' && <RepeatMonthly setMonthlySchedule={setMonthlySchedule} initialMonthSetting={days!} /> }
            { repeatPattern === 'monthly-by-weekdays' && <RepeatMonthlyByWeekdays setMonthlyScheduleByWeekday={setMonthlyScheduleByWeekday} initialWeekPattern={weekPattern!} /> }
        </>
    );
}

const styles = StyleSheet.create({
    containerLabel: {
        padding: 5,
    },
    selectContainer: {
        padding: 20,
        borderWidth: 1,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    selectContainerList: {
        position: 'absolute',
        marginTop: 100,
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: 'white',
        width: '100%',
        zIndex: 5,
    },
    listItem: {
        paddingHorizontal: 20,
        paddingVertical: 16
    },
    listItemText: {
        fontSize: 16,
    },
    selectedRepeatPatternText: {
        fontSize: 16,
        width: '80%',
    },
    selectContainerIcon: {
        width: 24
    }
});