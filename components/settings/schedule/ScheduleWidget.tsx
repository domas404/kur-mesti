import { Ionicons } from "@expo/vector-icons";
import { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import WidgetMenu from "./WidgetMenu";
import { useThemeColor } from "@/hooks/useThemeColor";

type Props = {

}

export default function ScheduleWidget() {

    const [color, backgroundColor, border] = useThemeColor(['text', 'container', 'border']);

    const [menuVisible, setMenuVisible] = useState<boolean>(false);
    // const menuRef = useRef(null);

    const toggleMenuVisibility = () => {
        setMenuVisible(!menuVisible);
    }

    const closeMenu = () => {
        setMenuVisible(false);
    }

    return (
        <>
            <View style={[styles.container, {backgroundColor, borderColor: border}]}>
                <View style={styles.header}>
                    <Text style={[styles.headerText, {color}]}>Atliekų išvežimas po:</Text>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={toggleMenuVisibility}
                        style={styles.menuButton}
                    >
                        <Ionicons name={'ellipsis-vertical'} size={24} color={color} />
                    </TouchableOpacity>
                    <WidgetMenu visible={menuVisible} closeMenu={closeMenu} color={color} backgroundColor={backgroundColor} />
                </View>
                <Text style={[styles.countdownText, {color}]}>6 dienų</Text>
                <View style={styles.scheduleDateContainer}>
                    <Text style={[styles.scheduleDate]}>01-15 Trečiadienis</Text>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        // boxShadow: '0 5 12 rgba(0,0,0,0.1)',
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
        backgroundColor: '#3B5E47',
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8
    },
    scheduleDate: {
        fontSize: 16,
        color: '#E4FFE6',
    },
    menuButton: {
        // backgroundColor: 'gray',
    },
});