import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type SettingsItemProps = {
    icon: any,
    title: string,
    id: string
}

export default function SettingsItem({ icon, title, id }: SettingsItemProps) {
    return (
        <Link href={`./settings/${id}`} style={styles.container} asChild>
            <Pressable>
                <View style={styles.header}>
                    <Ionicons name={icon} size={28} color={'black'} />
                    {/* <MaterialIcons name={icon} size={24} color={'black'} /> */}
                    <Text style={styles.settingTitle}>{title}</Text>
                </View>
                <Ionicons name={'chevron-forward'} size={18} color={'black'} />
            </Pressable>
        </Link>
    );
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'gray',
        borderRadius: 20,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        // marginVertical: 5,
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    settingTitle: {
        fontSize: 16,
    }
});