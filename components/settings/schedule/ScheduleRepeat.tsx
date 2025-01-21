import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import WeeklySchedule from "./WeeklySchedule";
import { useThemeColor } from "@/hooks/useThemeColor";
import BiWeeklySchedule from "./BiWeeklySchedule";
import MonthlySchedule from "./MonthlySchedule";
import MonthlyScheduleByWeekdays from "./MonthlyScheduleByWeekdays";
import { WeekPattern } from "@/types/schedule";

type RepeatPatternMap = {
    [key: string]: string
}

const repeatPatternMap: RepeatPatternMap = {
    'weekly': 'Kiekvieną savaitę',
    'bi-weekly': 'Kas n-tąją savaitę',
    'month-day': 'Kiekvieną mėnesį (pagal mėnesio dienas)',
    'month-weekday': 'Kiekvieną mėnesį (pagal savaitės dienas)'
}

const repeatPatternList = [
    { id: 'weekly', title: 'Kiekvieną savaitę' },
    { id: 'bi-weekly', title: 'Kas n-tąją savaitę' },
    { id: 'month-day', title: 'Kiekvieną mėnesį (pagal mėnesio dienas)' },
    { id: 'month-weekday', title: 'Kiekvieną mėnesį (pagal savaitės dienas)' },
];

type Props = {
    setWeeklySchedule: (value: number[]) => void;
    setBiWeeklySchedule: (selectedWeekdays: number[], interval: number, startDate: Date) => void;
    setMonthlySchedule: (selectedDays: number[]) => void;
    setMonthlyScheduleByWeekday: (weekPattern: WeekPattern[]) => void;
}

export default function ScheduleRepeat({ setWeeklySchedule, setBiWeeklySchedule, setMonthlySchedule,setMonthlyScheduleByWeekday }: Props) {

    const [repeatPattern, setRepeatPattern] = useState<string>('');
    const [selectListVisible, setSelectListVisible] = useState<boolean>(false);

    const [backgroundColor, color, border] = useThemeColor(['container', 'text', 'border']);

    const changeRepeatPattern = (id: string) => {
        setRepeatPattern(id);
        setSelectListVisible(false);
    }

    const mappedRepeatPatterns = repeatPatternList.map((item, index) => {
        return (
            <TouchableOpacity
                key={`${item.id}-${index}`}
                style={styles.listItem}
                onPress={() => changeRepeatPattern(item.id)}
            >
                <Text style={[styles.listItemText, {color}]}>{item.title}</Text>
            </TouchableOpacity>
        );
    })

    return (
        <>
            <View style={styles.container}>
                <Text style={[styles.containerLabel, {color}]}>Periodiškumas</Text>
                <TouchableOpacity
                    style={[styles.selectContainer, {backgroundColor, borderColor: border}]}
                    onPress={() => setSelectListVisible(!selectListVisible)}
                    activeOpacity={0.7}
                >
                    <Text style={[styles.selectedRepeatPatternText, {color}]} numberOfLines={1}>
                        {repeatPattern === '' ? 'Pasirinkti': repeatPatternMap[repeatPattern]}
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
            { repeatPattern === 'weekly' && <WeeklySchedule setWeeklySchedule={setWeeklySchedule} />}
            { repeatPattern === 'bi-weekly' && <BiWeeklySchedule setBiWeeklySchedule={setBiWeeklySchedule} /> }
            { repeatPattern === 'month-day' && <MonthlySchedule setMonthlySchedule={setMonthlySchedule} /> }
            { repeatPattern === 'month-weekday' && <MonthlyScheduleByWeekdays setMonthlyScheduleByWeekday={setMonthlyScheduleByWeekday} /> }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        // gap: 20
    },
    containerLabel: {
        padding: 5,
    },
    selectContainer: {
        padding: 20,
        borderWidth: 1,
        borderColor: '#ddd',
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
        borderColor: '#ddd',
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