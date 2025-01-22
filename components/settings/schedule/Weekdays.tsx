import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useThemeColor } from "@/hooks/useThemeColor";

type Props = {
    weekSetting: boolean[];
    updateWeekSetting: (index: number) => void;
}

export default function Weekdays({ weekSetting, updateWeekSetting }: Props) {

    const { text: color, border, tintLight, tintText } = useThemeColor();

    const mappedWeekdays = weekSetting.map((item, index) => {
        const week = ['P', 'A', 'T', 'K', 'P', 'Š', 'S'];
        return (
            <TouchableOpacity
                style={[styles.weekdayButton, item && {backgroundColor: tintLight}, {borderColor: border}]}
                key={`${week[index]}-${index}`}
                activeOpacity={0.7}
                onPress={() => updateWeekSetting(index)}
            >
                <Text style={[styles.weekdayButtonText, item ? {color: tintText} : {color}]}>{week[index]}</Text>
            </TouchableOpacity>
        );
    });

    return (
        <View style={styles.container}>
            {mappedWeekdays}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    weekdayButton: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    weekdayButtonText: {
        fontSize: 18,
        textAlign: 'center',
    },
});