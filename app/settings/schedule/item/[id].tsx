import RepeatNav from "@/components/settings/schedule/RepeatNav";
import ScheduleOneTime from "@/components/settings/schedule/ScheduleOneTime";
import ScheduleRepeat from "@/components/settings/schedule/ScheduleRepeat";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Stack, useLocalSearchParams } from "expo-router";
import { useId } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSchedule } from "@/hooks/useSchedule";

export default function Item() {

    const { id } = useLocalSearchParams();
    const [containerColor, color, tabActiveColor] = useThemeColor(['container', 'text', 'tabActive']);

    const newId = ('s'+useId().slice(1, -1));

    const {
        schedule,
        changeRepeat,
        setOneTimeSchedule,
        setWeeklySchedule,
        setBiWeeklySchedule,
        setMonthlySchedule,
        setMonthlyScheduleByWeekday,
        loaded,
        setRepeatPattern,
        saveSchedule
    } = useSchedule({ id: id === 'new' ? newId : id as string, repeat: false, closestDate: undefined });

    return (
        <>
            <Stack.Screen
                options={{
                    title: id === 'new' ? 'Pridėti naują grafiką' : 'Redaguoti grafiką',
                }}
            />
            <GestureHandlerRootView>
                <ScrollView contentContainerStyle={{paddingBottom: 100}}>
                    <View style={[styles.container, {backgroundColor: containerColor}]}>
                        {loaded &&
                        <>
                            <RepeatNav repeat={schedule.repeat} setRepeat={changeRepeat} />
                            {
                                schedule.repeat ?
                                <ScheduleRepeat
                                    setWeeklySchedule={setWeeklySchedule}
                                    setBiWeeklySchedule={setBiWeeklySchedule}
                                    setMonthlySchedule={setMonthlySchedule}
                                    setMonthlyScheduleByWeekday={setMonthlyScheduleByWeekday}
                                    repeatPattern={schedule.repeatPattern!}
                                    setRepeatPattern={setRepeatPattern}
                                    initialWeekPattern={schedule.weekPattern!}
                                    initialMonthSetting={schedule.days!}
                                    initialWeekdays={schedule.weekdays!}
                                    initialInterval={schedule.interval!}
                                    initialDate={schedule.startDate!}
                                />
                                :
                                <ScheduleOneTime setOneTimeSchedule={setOneTimeSchedule} initialDate={schedule.closestDate!} />
                            }
                            <TouchableOpacity
                                style={[styles.saveButton, {backgroundColor: tabActiveColor}]}
                                activeOpacity={0.7}
                                onPress={saveSchedule}
                            >
                                <Text style={[styles.saveButtonText, {color}]}>Išsaugoti</Text>
                            </TouchableOpacity>
                        </>
                        }
                    </View>
                </ScrollView>
            </GestureHandlerRootView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 20,
        padding: 20,
        gap: 20,
        height: '100%',
    },
    saveButton: {
        flex: 1,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    saveButtonText: {
        fontSize: 16,
    }
});