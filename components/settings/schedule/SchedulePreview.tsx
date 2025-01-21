import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';

import { calculateDaysUntil, getSentenceBiWeekly, getSentenceMonthly, getSentenceMonthlyByWeekdays, getSentenceWeekly } from '@/utils/scheduleUtils';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ScheduleItem } from "@/types/schedule";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

type Props = {
    item: ScheduleItem;
    id: string;
    deleteSchedule: (id: string) => void;
}

export default function SchedulePreview({ item, id, deleteSchedule }: Props) {

    const [backgroundColor, color, border, tabActiveColor] = useThemeColor(['container', 'text', 'border', 'tabActive']);

    const [viewMore, setViewMore] = useState(false);

    const closestDate = new Date(item.closestDate!);
    const daysUntil = calculateDaysUntil(closestDate);

    let text = 'Po ' + daysUntil + ' dienų';

    if (daysUntil === 0) {
        text = 'Šiandien';
    } else if (daysUntil === 1) {
        text = 'Rytoj';
    } else if (daysUntil % 10 === 1) {
        text = 'Po ' + daysUntil + ' dienos';
    } else if (daysUntil < 0) {
        if (daysUntil === -1)
            text = 'Vakar';
        else if (daysUntil > -10)
            text = 'Prieš ' + Math.abs(daysUntil) + ' dienas';
        else
            text = 'Prieš ' + daysUntil + ' dienų';
    }

    let sentence = '';

    if (item.repeat) {
        switch(item.period) {
            case 'weekly':
                sentence = getSentenceWeekly(item.weekdays!);
                break;
            case 'bi-weekly':
                sentence = getSentenceBiWeekly(item.weekdays!, item.interval!);
                break;
            case 'monthly':
                sentence = getSentenceMonthly(item.days!);
                break;
            case 'monthly-by-weekdays':
                sentence = getSentenceMonthlyByWeekdays(item.weekPattern!);
                break;
        }
    }

    const removeSchedule = (id: string) => {
        setViewMore(false);
        deleteSchedule(id);
    }
    return (
        <View style={[styles.scheduleItemContainer, {backgroundColor, borderColor: border}]}>
            {/* <Text style={[{color}]}>Atliekų išvežimas{daysUntil > 1 && ' po'}:</Text> */}
            <View style={styles.headerContainer}>
                <View style={{flexDirection: 'row', gap: 12, alignItems: 'center'}}>
                    <Text style={[styles.headerText, {color}]}>{text}</Text>
                    <Text style={[styles.dateText, {color, borderColor: border}]}>{closestDate.toISOString().slice(5, 10)}</Text>
                </View>
                <View style={[styles.dateMenuContainer]}>
                    <TouchableOpacity
                        style={[styles.iconButton, {backgroundColor: tabActiveColor}]}
                        activeOpacity={0.7}
                        onPress={() => setViewMore(!viewMore)}
                    >
                        <Ionicons name={viewMore ? 'chevron-up' : 'chevron-down'} size={18} color={color} />
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={[styles.repeatPatternText, {color, backgroundColor: tabActiveColor}]}>{item.repeat ? 'Periodinis - ' : 'Vienkartinis'}{item.repeat && sentence}</Text>
            {
                viewMore &&
                <View style={[styles.actionsContainer]}>
                    <TouchableOpacity style={[styles.actionsButton]}>
                        <MaterialIcons name={'edit'} size={20} color={color} />
                        <Text style={[styles.actionsButtonText, {color}]}>Redaguoti</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionsButton]} onPress={() => removeSchedule(id)}>
                        <Ionicons name={'trash-outline'} size={20} color={color} />
                        <Text style={[styles.actionsButtonText, {color}]}>Ištrinti</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    scheduleItemContainer: {
        padding: 20,
        borderRadius: 20,
        marginHorizontal: 10,
        borderWidth: 1,
        gap: 8,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 24,
        fontWeight: 500
    },
    repeatPatternText: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        alignSelf: 'flex-start'
    },
    dateText: {
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 100,
        paddingHorizontal: 10,
        paddingVertical: 2,
        height: 28
    },
    dateMenuContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    iconButton: {
        width: 24,
        height: 24,
        padding: 3,
        borderRadius: 12,
    },
    actionsContainer: {
        gap: 4,
        paddingTop: 4,
    },
    actionsButton: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        paddingVertical: 10,
    },
    actionsButtonText: {
        fontSize: 16,
    }
});