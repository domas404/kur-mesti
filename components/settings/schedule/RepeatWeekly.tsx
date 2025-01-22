import { useEffect, useState } from "react";
import { View, Text } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import Weekdays from "./Weekdays";
import WeekdayNames from "./WeekdayNames";

type Props = {
    setWeeklySchedule: (value: number[]) => void;
    initialWeekdays: number[];
}

const initialWeekSetting: boolean[] = [false, false, false, false, false, false, false];

export default function RepeatWeekly({ setWeeklySchedule, initialWeekdays }: Props) {

    const [weekSetting, setWeekSetting] = useState<boolean[]>(initialWeekSetting);
    const { text: color } = useThemeColor();

    useEffect(() => {
        console.log(weekSetting);
        if (initialWeekdays) {
            const weekSettingCopy = [...weekSetting];
            initialWeekdays.forEach((item, i) => {
                weekSettingCopy[item] = true;
            })
            setWeekSetting([...weekSettingCopy]);
        }
    }, []);

    const updateWeekSetting = (index: number) => {
        setWeekSetting(() => {
            const newValue = [...weekSetting];
            newValue[index] = !newValue[index];
            return newValue;
        })
    }

    useEffect(() => {
        const weekdays: number[] = [];
        weekSetting.forEach((item, index) => {
            if (item)
                weekdays.push(index);
        });
        setWeeklySchedule(weekdays);

    }, [weekSetting]);

    return (
        <View>
            <Text style={{ padding: 5, color }}>Savaitės diena(-os)</Text>
            <Weekdays weekSetting={weekSetting} updateWeekSetting={updateWeekSetting} />
            <WeekdayNames weekSetting={weekSetting} />
        </View>
    );
}
