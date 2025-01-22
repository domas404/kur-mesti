import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useId } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack, useLocalSearchParams } from "expo-router";

import { useThemeColor } from "@/hooks/useThemeColor";
import { useSchedule } from "@/hooks/useSchedule";
import RepeatNav from "@/components/settings/schedule/ToggleRepeat";
import ScheduleOnce from "@/components/settings/schedule/ScheduleOnce";
import ScheduleRepeat from "@/components/settings/schedule/ScheduleRepeat";

export default function Item() {

    const { id } = useLocalSearchParams();
    const newId = ('s'+useId().slice(1, -1));

    const { container: containerColor, text: color, tabActive: tabActiveColor } = useThemeColor();

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
                                    setRepeatPattern={setRepeatPattern}
                                    initialSchedule={schedule}
                                />
                                :
                                <ScheduleOnce setOneTimeSchedule={setOneTimeSchedule} initialDate={schedule.closestDate!} />
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