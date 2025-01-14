import ScheduleOneTime from "@/components/schedule/ScheduleOneTime";
import ScheduleRepeat from "@/components/schedule/ScheduleRepeat";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Stack } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";


export default function Item() {

    const [repeat, setRepeat] = useState<boolean>(false);

    const color = useThemeColor({}, 'text');
    const tabColor = useThemeColor({}, 'tab');
    const tabActiveColor = useThemeColor({}, 'tabActive');
    const containerColor = useThemeColor({}, 'container');

    return (
        <>
            <Stack.Screen
                options={{
                    title: `Pridėti naują grafiką`
                }}
            />
            <GestureHandlerRootView>
                {/* <ScrollView> */}
                    <View style={[styles.container, {backgroundColor: containerColor}]}>
                        {/* <TextInput
                            // style={{color: 'white'}}
                            value={'Atliekų išvežimas'}
                        /> */}
                        <View style={[styles.typeContainer]}>
                            <TouchableOpacity
                                style={[
                                    styles.typeTab,
                                    {borderTopLeftRadius: 12, borderBottomLeftRadius: 12},
                                    {backgroundColor: tabColor},
                                    !repeat && { backgroundColor: tabActiveColor}
                                ]}
                                activeOpacity={0.7}
                                onPress={() => setRepeat(false)}
                            >
                                <Text style={[styles.typeTabText, {color}]}>Vienkartinis</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.typeTab,
                                    {borderTopRightRadius: 12, borderBottomRightRadius: 12},
                                    {backgroundColor: tabColor},
                                    repeat && { backgroundColor: tabActiveColor}
                                ]}
                                activeOpacity={0.7}
                                onPress={() => setRepeat(true)}
                            >
                                <Text style={[styles.typeTabText, {color}]}>Periodinis</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            repeat ?
                            <ScheduleRepeat />
                            :
                            <ScheduleOneTime />
                        }
                    </View>
                {/* </ScrollView> */}
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
    typeContainer: {
        flexDirection: 'row',
        borderRadius: 8,
    },
    typeTab: {
        // backgroundColor: '#fff',
        // borderWidth: 1,
        // borderColor: '#ddd',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    typeTabText: {
        fontSize: 16
    },
    // selectedTypeTab: {
    //     backgroundColor: '#ddd',
    // }
});