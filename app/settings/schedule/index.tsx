import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ScheduleItem } from "@/types/schedule";
import { sortScheduleList } from "@/utils/scheduleUtils";
import SchedulePreview from "@/components/settings/schedule/Preview";
import ToogleSetting from "@/components/settings/schedule/ToggleSetting";

export default function Schedule() {

    const { container: backgroundColor, text: color, border } = useThemeColor();
    const [scheduleList, setScheduleList] = useState<ScheduleItem[]>([]);

    const [visible, setVisible] = useState(true);
    const [reminderOn, setReminderOn] = useState(false);

    useFocusEffect(
        useCallback(() => {
            const setupScheduleList = async () => {
                const storage = await AsyncStorage.getItem('schedule');
                if (storage) {
                    const scheduleObjectList: ScheduleItem[] = await JSON.parse(storage) as ScheduleItem[];
                    sortScheduleList(scheduleObjectList);
                    setScheduleList(scheduleObjectList);
                }
                // await AsyncStorage.clear();
            }
            setupScheduleList();
        }, [])
    );

    const deleteSchedule = async (id: string) => {
        const schedule = scheduleList.find((item) => item.id === id);
        const index = scheduleList.indexOf(schedule!);
        const newScheduleList = [...scheduleList];
        newScheduleList.splice(index, 1);
        await AsyncStorage.setItem('schedule', JSON.stringify(newScheduleList));
        setScheduleList(newScheduleList);
    }
    
    const editSchedule = (id: string) => {
        router.navigate(`./schedule/item/${id}`);
    }

    const mappedScheduleList = scheduleList.map((item, index) => {
        return <SchedulePreview key={index} item={item} id={item.id} deleteSchedule={deleteSchedule} editSchedule={editSchedule} />
    });

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Atliekų išvežimo grafikas'
                }}
            />
            <GestureHandlerRootView>
                <ScrollView contentContainerStyle={{paddingBottom: 100}}>
                    <View>
                        <View style={[styles.settingsContainer, {backgroundColor, borderColor: border}]}>
                            <ToogleSetting name={'Rodyti pagrindiniame ekrane'} setting={visible} setSetting={setVisible} />
                            <ToogleSetting name={'Priminimas'} setting={reminderOn} setSetting={setReminderOn} />
                        </View>
                        <Link style={[styles.addNew]} href={`./schedule/item/new`} asChild>
                            <TouchableOpacity activeOpacity={0.7} >
                                <Ionicons name={'add-circle-outline'} size={24} color={color} />
                                <Text style={[styles.addNewText, {color}]}>Pridėti naują grafiką</Text>
                            </TouchableOpacity>
                        </Link>
                        <View style={[styles.scheduleList]}>
                            {mappedScheduleList}
                        </View>
                    </View>
                </ScrollView>
            </GestureHandlerRootView>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerTitle: {
        flexDirection: 'row',
        gap: 10
    },
    headerTitleText: {
        fontSize: 16
    },
    addNew: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        margin: 10,
        gap: 16,
        borderRadius: 20,
    },
    addNewText: {
        fontSize: 16
    },
    scheduleList: {
        gap: 10
    },
    settingsContainer: {
        margin: 10,
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
        gap: 24,
    },
});