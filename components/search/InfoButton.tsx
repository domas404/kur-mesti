import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function InfoButton() {

    const { tintLight: color } = useThemeColor();

    return (
        <Link style={styles.container} href="./info" asChild>
            <TouchableOpacity activeOpacity={0.8}>
                <Ionicons name={'information-circle-outline'} size={28} color={color} />
            </TouchableOpacity>
        </Link>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'center',
        paddingHorizontal: 16,
        borderRadius: 20,
    },
});