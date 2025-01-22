import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function SettingsButton() {

    const { text: color } = useThemeColor();

    return (
        <Link style={styles.container} href="./settings" asChild>
            <Pressable>
                <Ionicons name={'settings-outline'} size={28} color={color} />
            </Pressable>
        </Link>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'center',
        paddingHorizontal: 16,
        borderRadius: 20,
    }
});