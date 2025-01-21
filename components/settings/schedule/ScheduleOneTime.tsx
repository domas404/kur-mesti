import { View, Text, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import DatePicker from "./DatePicker";
import { useEffect, useState } from "react";

type Props = {
    setOneTimeSchedule: (date: Date) => void;
    initialDate: string;
}

export default function ScheduleOneTime({ setOneTimeSchedule, initialDate }: Props) {
    const [color] = useThemeColor(['text']);
    const [date, setDate] = useState<Date>(new Date());
    
    useEffect(() => {
        console.log(initialDate);
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

const styles = StyleSheet.create({
    dateContainer: {
        padding: 20,
        borderRadius: 8,
        borderWidth: 1,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center'
    },
    dateText: {
        fontSize: 16,
    }
});