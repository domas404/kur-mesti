import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, useColorScheme } from "react-native";
import * as NavigationBar from 'expo-navigation-bar';
import { Link } from "expo-router";

type Props = {
    visible: boolean;
    closeMenu: () => void;
    color: string;
    backgroundColor: string;
}

export default function WidgetMenu({ visible, closeMenu, color, backgroundColor }: Props) {

    const colorScheme = useColorScheme();

    NavigationBar.setBorderColorAsync(colorScheme === 'dark' ? 'black' : 'white');

    return (
        <Modal
            transparent
            visible={visible}
            onRequestClose={closeMenu}
            animationType="fade"
        >
            <Pressable style={styles.overlay} onPress={closeMenu} />
            <View style={[styles.container, {backgroundColor}]}>
                <TouchableOpacity style={styles.menuItem}>
                    <Ionicons name={'eye-off-outline'} size={24} color={color} />
                    <Text style={[styles.menuItemText, {color}]}>Nerodyti</Text>
                </TouchableOpacity>
                <Link href={'../settings/schedule'} asChild>
                    <TouchableOpacity style={styles.menuItem} onPress={closeMenu}>
                        <Ionicons name={'settings-outline'} size={24} color={color} />
                        <Text style={[styles.menuItemText, {color}]}>Nustatymai</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 20,
        top: 90,
        backgroundColor: 'white',
        boxShadow: '0 5 12 rgba(0,0,0,0.1)',
        borderWidth: 1,
        borderColor: 'rgba(150,150,150,0.2)',
        paddingVertical: 10,
        borderRadius: 20,
        zIndex: 10,
        gap: 2,
        width: 180,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    menuItemText: {
        fontSize: 16
    },
    overlay: {
        height: '100%',
        width: '100%'
    }
})