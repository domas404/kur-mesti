import { Ionicons } from "@expo/vector-icons";
import { useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import WidgetMenu from "./WidgetMenu";
import { useThemeColor } from "@/hooks/useThemeColor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { calculateDaysUntil, getScheduleFromLocalStorage, storageUpToDate, updateClosestDates } from "@/utils/schedule/scheduleUtils";
import { useFocusEffect } from "@react-navigation/native";
import { getWidgetDateText, getWidgetDaysUntilText, getWidgetHeaderText } from "@/utils/schedule/scheduleWording";
import { Link } from "expo-router";

type ScheduleInfo = {
    daysUntil: number;
    date: string;
    weekday: number;
}

type Props = {
    widgetVisibility: boolean;
    updateWidgetVisibility: (visibility: boolean) => void;
}

export default function ScheduleWidget({ widgetVisibility, updateWidgetVisibility }: Props) {

    const { text: color, container: backgroundColor, border, tintText, tint } = useThemeColor();
    const [schedule, setSchedule] = useState<ScheduleInfo>({ daysUntil: -1, date: '', weekday: -1 });
    const [menuVisible, setMenuVisible] = useState<boolean>(false);

    const toggleMenuVisibility = () => {
        setMenuVisible(!menuVisible);
    }

    const closeMenu = () => {
        setMenuVisible(false);
    }

    useFocusEffect(
        useCallback(() => {
            const setupScheduleList = async () => {
                const storage = await AsyncStorage.getItem('schedule');
                const storedDateString = await AsyncStorage.getItem('scheduleLastUpdate');
                
                if (!storedDateString || !storageUpToDate(storedDateString!)) {
                    const today = new Date();
                    const updatedStorage = await updateClosestDates(storage!, new Date());
                    await AsyncStorage.setItem('schedule', JSON.stringify(updatedStorage));
                    await AsyncStorage.setItem('scheduleLastUpdate', (new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()))).toString());
                }

                const closestSchedule = await getScheduleFromLocalStorage();

                if (closestSchedule) {
                    const closestDate = new Date(closestSchedule.closestDate!);
                    setSchedule((prevSchedule) => ({
                        ...prevSchedule,
                        daysUntil: calculateDaysUntil(closestDate),
                        date: closestDate.toISOString().slice(5, 10),
                        weekday: closestDate.getDay()
                    }));
                } else {
                    setSchedule({ daysUntil: -1, date: '', weekday: -1 });
                }
                // await AsyncStorage.clear();
            }
            setupScheduleList();
        }, [])
    );

    return (
        <>
            <View style={[styles.container, {backgroundColor, borderColor: border}]}>
                <View style={styles.header}>
                    <Text style={[styles.headerText, {color}]}>
                        {getWidgetHeaderText(schedule.daysUntil)}
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={toggleMenuVisibility}
                    >
                        <Ionicons name={'ellipsis-vertical'} size={24} color={color} />
                    </TouchableOpacity>
                    <WidgetMenu
                        visible={menuVisible}
                        closeMenu={closeMenu}
                        widgetVisibility={widgetVisibility}
                        updateWidgetVisibility={updateWidgetVisibility}
                    />
                </View>
                <Text style={[styles.countdownText, {color}]}>
                    {getWidgetDaysUntilText(schedule.daysUntil)}
                </Text>
                {
                    schedule.daysUntil < 0 ?
                    <Link style={[styles.newScheduleContainer, { backgroundColor: tint }]} href={'../settings/schedule/item/new'} asChild>
                        <TouchableOpacity activeOpacity={0.7}>
                            <Ionicons name={'add-circle-outline'} size={18} color={tintText} />
                            <Text style={[styles.scheduleDate, { color: tintText }]}>
                                Pridėti naują grafiką
                            </Text>
                        </TouchableOpacity>
                    </Link>
                    :
                    <View style={[styles.scheduleDateContainer, { backgroundColor: tint }]}>
                        <Text style={[styles.scheduleDate, { color: tintText }]}>
                            {getWidgetDateText(schedule.date, schedule.weekday)}
                        </Text>
                    </View>
                }
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderWidth: 1,
		borderColor: '#dadada',
        margin: 10,
        borderRadius: 20,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerText: {
        fontSize: 18,
    },
    countdownText: {
        fontSize: 42,
        fontWeight: 500
    },
    scheduleDateContainer: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8
    },
    scheduleDate: {
        fontSize: 16,
    },
    newScheduleContainer: {
        alignSelf: 'flex-start',
        paddingLeft: 6,
        paddingRight: 10,
        paddingVertical: 4,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    }
});
