import ScheduleOneTime from "@/components/schedule/ScheduleOneTime";
import ScheduleRepeat from "@/components/schedule/ScheduleRepeat";
import { Stack } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";


export default function Item() {

    const [repeat, setRepeat] = useState<boolean>(false);

    return (
        <>
            <Stack.Screen
                options={{
                    title: `Pridėti naują grafiką`
                }}
            />
            <GestureHandlerRootView>
                <View style={styles.container}>
                    {/* <TextInput
                        // style={{color: 'white'}}
                        value={'Atliekų išvežimas'}
                    /> */}
                    <View style={styles.typeContainer}>
                        <TouchableOpacity
                            style={[styles.typeTab, {borderTopLeftRadius: 12, borderBottomLeftRadius: 12}]}
                            activeOpacity={0.7}
                            onPress={() => setRepeat(false)}
                        >
                            <Text style={styles.typeTabText}>Vienkartinis</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.typeTab, {borderTopRightRadius: 12, borderBottomRightRadius: 12}]}
                            activeOpacity={0.7}
                            onPress={() => setRepeat(true)}
                        >
                            <Text style={styles.typeTabText}>Periodinis</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        repeat ?
                        <ScheduleRepeat />
                        :
                        <ScheduleOneTime />
                    }
                </View>
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
    },
    typeContainer: {
        flexDirection: 'row',
        borderRadius: 8,
    },
    typeTab: {
        backgroundColor: '#eee',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    typeTabText: {
        fontSize: 16
    }
});