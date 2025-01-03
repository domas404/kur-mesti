import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { useState } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';

type LabelCategory = {
    name: string,
    id: string
}

type LabelCategoryProps = {
    item: LabelCategory,
}

export default function LabelCategory({ item }: LabelCategoryProps) {

    const backgroundColor = useThemeColor({}, 'container');
    const color = useThemeColor({}, 'text');

    return (
        <Link style={styles.container} href={`./labeling/${item.id}`} asChild>
            <Pressable style={{ backgroundColor }}>
                {/* <Text style={styles.nameContainer}>{item.name}</Text> */}
                <View style={styles.wasteDisposalContainer}>
                    <View style={styles.headerContainer}>
                        <Ionicons name={'cube-outline'} size={36} color={color} />
                        <Text style={[styles.wasteDisposalText, {color}]}>{item.name}</Text>
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
        boxShadow: '0 5 12 rgba(0, 0, 0, 0.1)'
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16
    },
    nameContainer: {
        fontSize: 18,
        width: '70%',
        fontWeight: 500
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
    showMoreButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        padding: 8,
        alignSelf: 'flex-end'
    },
    showMoreIcon: {
        width: 18
    },
    showMoreContainer: {
        width: '100%',
    }
});