import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type Props = {

}

const initialWeekSetting: boolean[] = Array(7).fill(false);

export default function BiWeeklySchedule() {

    const [weekSetting, setWeekSetting] = useState<boolean[]>(initialWeekSetting);

    const backgroundColor = useThemeColor({}, 'container');
    const color = useThemeColor({}, 'text');
    const border = useThemeColor({}, 'border');
    const tint = useThemeColor({}, 'tint');
    const tintLight = useThemeColor({}, 'tintLight');
    const tintText = useThemeColor({}, 'tintText');

    // const [mappedWeekdays, setMappedWeekdays] = useState();

    const updateWeekSetting = (index: number) => {
        setWeekSetting(() => {
            const newValue = [...weekSetting];
            newValue[index] = !newValue[index];
            return newValue;
        })
    }

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
        <View>
            <Text style={[styles.containerLabel, {color}]}>Savaitės diena(-os)</Text>
            <View style={styles.weekdayListContainer}>
                {mappedWeekdays}
            </View>
            <View style={styles.weekdayList}>
                {
                    weekSetting.map((item, index) => {
                        const weekdays = ['Pirmadienis', 'Antradienis', 'Trečiadienis', 'Ketvirtadienis', 'Penktadienis', 'Šeštadienis', 'Sekmadienis'];
                        if (item) {
                            return (
                                <Text key={index} style={[styles.weekdayListItem, {backgroundColor: tint, color: tintText}]}>
                                    {weekdays[index]}
                                </Text>
                            );
                        }
                    })
                }
            </View>
            <Text style={[styles.containerLabel, {color}]}>Kas kiek savaičių?</Text>
            <View
                style={[styles.selectContainer, {backgroundColor, borderColor: border}]}
                // onPress={() => setSelectListVisible(!selectListVisible)}
                // activeOpacity={0.7}
            >
                <Text style={[styles.selectedRepeatPatternText, {color}]} numberOfLines={1}>
                    2
                    {/* {repeatPattern === '' ? 'Pasirinkti': repeatPatternMap[repeatPattern]} */}
                </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.toggleNumberButton, {borderColor: border}]}>
                        <Ionicons name={'add'} size={24} color={color} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.toggleNumberButton, {borderColor: border}]}>
                        <Ionicons name={'remove'} size={24} color={color} />
                    </TouchableOpacity>
                </View>
                {/* <Ionicons
                    style={styles.selectContainerIcon}
                    name={selectListVisible ? 'chevron-up-outline' : 'chevron-down-outline'}
                    size={24}
                    color={color}
                /> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerLabel: {
        padding: 5,
    },
    weekdayListContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        // gap: 10
    },
    weekdayButton: {
        width: 36,
        height: 36,
        // flexDirection: 'row',
        // backgroundColor: '#158abb',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    weekdayButtonSelected: {
        backgroundColor: '#92a8fc',
    },
    weekdayButtonText: {
        fontSize: 18,
        textAlign: 'center',
        // color: 'white'
    },
    weekdayList: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 5,
        flexWrap: 'wrap',
    },
    weekdayListItem: {
        paddingHorizontal: 5,
        paddingVertical: 2,
        // backgroundColor: '#eee',
        borderRadius: 4,
        marginRight: 5,
        marginBottom: 5
    },
    selectedRepeatPatternText: {
        fontSize: 16,
        textAlign: 'center',
        flex: 2,
        // width: '80%',
    },
    selectContainer: {
        // padding: 20,
        // paddingHorizontal: 20,
        height: 64,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '50%'
    },
    toggleNumberButton: {
        // borderWidth: 1,
        padding: 8,
        borderRadius: 100,
    },
    buttonContainer: {
        flexDirection: 'row',
        flex: 3,
        gap: 10,
    }
});