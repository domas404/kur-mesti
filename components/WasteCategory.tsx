import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';

type WasteCategoryProps = {
    name: string,
    icon: any,
    id: string
}

export default function WasteCategory({ name, icon, id }: WasteCategoryProps) {

    const backgroundColor = useThemeColor({}, 'container');
    const color = useThemeColor({}, 'text');

    return (
        <Link style={[styles.container, {backgroundColor}]} href={`./search/category/${id}`} asChild>
            <Pressable>
                <View style={styles.iconContainer}>
                    <Ionicons name={icon} size={36} color={color} />
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
        paddingHorizontal: 20,
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        width: '49%',
        marginVertical: 4,
        gap: 16,
        boxShadow: '0 5 12 rgba(0, 0, 0, 0.1)'
    },
    iconContainer: {

    },
    nameContainer: {
        fontSize: 18,
        width: '70%',
    }
});