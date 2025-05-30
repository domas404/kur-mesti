import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';

type WasteCategoryProps = {
    name: string,
    icon: any,
    id: string
}

export default function WasteCategory({ name, icon, id }: WasteCategoryProps) {

    const { container: backgroundColor, text: color, border } = useThemeColor();

    return (
        <Link style={[styles.container, {backgroundColor, borderColor: border}]} href={`./search/category/${id}`} asChild>
            <Pressable>
                <View style={styles.iconContainer}>
                    <Ionicons name={icon} size={24} color={'#E4FFE6'} />
                </View>
                <Text style={[styles.nameContainer, {color}]}>{name}</Text>
            </Pressable>
        </Link>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 16,
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        width: '49%',
        marginVertical: 4,
        gap: 12,
        borderWidth: 1,
    },
    iconContainer: {
        backgroundColor: '#86B38A',
		width: 36,
		height: 36,
		borderRadius: 18,
		padding: 6,
    },
    nameContainer: {
        fontSize: 16,
        flexWrap: 'wrap',
        flex: 1,
    }
});