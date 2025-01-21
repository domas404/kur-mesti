import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SchedulePreview from "@/components/settings/schedule/SchedulePreview";
import { ScheduleItem } from "@/types/schedule";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ToogleSetting from "@/components/settings/schedule/ToggleSetting";
import { calculateDaysUntil } from "@/utils/scheduleUtils";

export default function Schedule() {

    const [backgroundColor, color, border] = useThemeColor(['container', 'text', 'border']);

    const [scheduleList, setScheduleList] = useState<ScheduleItem[]>([]);

    const [visible, setVisible] = useState(true);
    const [reminderOn, setReminderOn] = useState(false);

    useEffect(() => {
        const setupScheduleList = async () => {
            const storage = await AsyncStorage.getItem('schedule');
            if (storage) {
                const scheduleObjectList: ScheduleItem[] = await JSON.parse(storage) as ScheduleItem[];
                scheduleObjectList.sort((a, b) => {
                    const closestDateA = new Date(a.closestDate!);
                    const daysUntilA = calculateDaysUntil(closestDateA);
                    const closestDateB = new Date(b.closestDate!);
                    const daysUntilB = calculateDaysUntil(closestDateB);
                    return daysUntilA - daysUntilB;

                })
                setScheduleList(scheduleObjectList);
            }
            // await AsyncStorage.clear();
        }
        setupScheduleList();
    }, []);

    const deleteSchedule = async (id: string) => {
        const schedule = scheduleList.find((item) => item.id === id);
        const index = scheduleList.indexOf(schedule!);
        const newScheduleList = [...scheduleList];
        newScheduleList.splice(index, 1);
        await AsyncStorage.setItem('schedule', JSON.stringify(newScheduleList));
        setScheduleList(newScheduleList);
        // console.log(id, index);
    }

    const mappedScheduleList = scheduleList.map((item, index) => {
        return <SchedulePreview key={index} item={item} id={item.id} deleteSchedule={deleteSchedule} />
    });

    const editSchedule = () => {}


    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Atliekų išvežimo grafikas'
                }}
            />
            <GestureHandlerRootView>
                <ScrollView contentContainerStyle={{paddingBottom: 100}}>
                    <View style={styles.container}>
                        <View style={[styles.settingsContainer, {backgroundColor, borderColor: border}]}>
                            <ToogleSetting name={'Rodyti pagrindiniame ekrane'} setting={visible} setSetting={setVisible} />
                            <ToogleSetting name={'Priminimas'} setting={reminderOn} setSetting={setReminderOn} />
                        </View>
                        {/* <View style={[styles.scheduleListContainer, {backgroundColor}]}> */}
                            <Link style={[styles.addNew]} href={'./schedule/item'} asChild>
                                <TouchableOpacity activeOpacity={0.7} >
                                    <Ionicons name={'add-circle-outline'} size={24} color={color} />
                                    <Text style={[styles.addNewText, {color}]}>Pridėti naują grafiką</Text>
                                </TouchableOpacity>
                            </Link>
                            <View style={[styles.scheduleList]}>
                                {mappedScheduleList}
                            </View>
                        {/* </View> */}
                    </View>
                </ScrollView>
            </GestureHandlerRootView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        
    },
    scheduleListContainer: {
        // margin: 10,
        borderWidth: 1,
        borderRadius: 20,
        // padding: 10,
    },
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
        borderWidth: 1
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
        // marginBottom: 30,
    },
});