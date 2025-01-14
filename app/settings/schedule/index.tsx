import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Link, router } from "expo-router";
import { useId } from "react";

export default function Schedule() {

    const color = useThemeColor({}, 'text');
    const backgroundColor = useThemeColor({}, 'container');

    const createNewSchedule = () => {
        // const id = useId();
        // router.replace(`./schedule/item/abc`);
    }


    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Atliekų išvežimo grafikas'
                }}
            />
            <View style={styles.container}>
                {/* <View style={styles.header}>
                    <View style={styles.headerTitle}>
                        <Ionicons name={'calendar-outline'} size={24} color={color} />
                        <Text style={[styles.headerTitleText, {color}]}>Atliekų išvežimo grafikas</Text>
                    </View>
                    <Ionicons name={'information-circle-outline'} size={24} color={color} />
                </View> */}
                <Link style={[styles.addNew, {backgroundColor}]} href={'./schedule/item'} asChild>
                    <TouchableOpacity activeOpacity={0.7} >
                        <Ionicons name={'add-circle-outline'} size={24} color={color} />
                        <Text style={[styles.addNewText, {color}]}>Pridėti naują grafiką</Text>
                    </TouchableOpacity>
                </Link>
                <View style={styles.scheduleList}>

                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        
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
        borderRadius: 20
        // justifyContent: 'center'
    },
    addNewText: {
        fontSize: 16
    },
    scheduleList: {

    }
});