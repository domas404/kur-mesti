import { View, Text } from "react-native";
import { useEffect, useState } from "react";

import { useThemeColor } from "@/hooks/useThemeColor";
import DatePicker from "./DatePicker";

type Props = {
    setOneTimeSchedule: (date: Date) => void;
    initialDate: string;
}

export default function ScheduleOneTime({ setOneTimeSchedule, initialDate }: Props) {
    const { text: color } = useThemeColor();
    const [date, setDate] = useState<Date>(new Date());
    
    useEffect(() => {
        if (initialDate) {
            const dateToSet: Date = new Date(initialDate);
            setDate(dateToSet);
        }
    }, []);

    useEffect(() => {
        setOneTimeSchedule(date);
    }, [date]);
    
    return (
        <View>
            <Text style={{color, padding: 5}}>Pasirinkite datą</Text>
            <View>
                <DatePicker date={date} setDate={setDate} />
            </View>
        </View>
    );
}
