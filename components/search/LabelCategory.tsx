import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';

type Props = {
    item: {
        name: string,
        id: string
    },
}

export default function LabelCategory({ item }: Props) {

    const { container: backgroundColor, text: color, border } = useThemeColor();
    const { name, id } = item;

    return (
        <Link style={[styles.container, {borderColor: border}]} href={`./labeling/${id}`} asChild>
            <Pressable style={{ backgroundColor }}>
                <View style={styles.wasteDisposalContainer}>
                    <View style={styles.headerContainer}>
                        <View style={styles.iconContainer}>
                            <Ionicons name={'cube-outline'} size={24} color={'#E4FFE6'} />
                        </View>
                        <Text style={[styles.wasteDisposalText, {color}]}>{name}</Text>
                    </View>
                    <Ionicons name={'arrow-forward'} size={28} color={color} />
                </View>
            </Pressable>
        </Link>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        padding: 20,
        width: '100%',
        marginVertical: 4,
        borderWidth: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16
    },
    wasteDisposalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        width: '100%',
        justifyContent: 'space-between'
    },
    wasteDisposalText: {
        fontSize: 18,
    },
    iconContainer: {
        backgroundColor: '#86B38A',
		width: 36,
		height: 36,
		borderRadius: 18,
		padding: 6,
    }
});