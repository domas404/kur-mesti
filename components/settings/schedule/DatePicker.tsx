import { Text, StyleSheet } from "react-native";
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";

type Props = {
    date: Date;
    setDate: React.Dispatch<React.SetStateAction<Date>>;
}

export default function DatePicker({ date, setDate }: Props) {

    const [backgroundColor, color, border] = useThemeColor(['container', 'text', 'border']);

    const onChange = (event: DateTimePickerEvent, selectedDate: Date) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };

    const showMode = () => {
        DateTimePickerAndroid.open({
            value: date,
            onChange: onChange as ((event: DateTimePickerEvent, date?: Date) => void) | undefined,
            mode: 'date',
            is24Hour: true,
        });
    };
    
    return (
        <TouchableOpacity style={[styles.dateContainer, {backgroundColor, borderColor: border}]} onPress={showMode}>
            <Ionicons name={'calendar-outline'} size={20} color={color} />
            <Text style={[styles.dateText, {color}]}>{date.toISOString().slice(0, 10)}</Text>
        </TouchableOpacity>
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