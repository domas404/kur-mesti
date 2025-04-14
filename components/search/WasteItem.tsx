import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { useThemeColor } from '@/hooks/useThemeColor';
import { wasteDisposalSiteMap } from '@/data/disposal-sites';

type Props = {
    item: {
        categoryId: string,
        name: string,
        icon: any,
        wasteDisposalSiteName: string,
        info: string,
        source: string
    }
}

export default function WasteItem({ item }: Props) {

    const [showMoreInfo, setShowMoreInfo] = useState<boolean>(false);
    const { categoryId, name, icon, wasteDisposalSiteName, info, source } = item;
    const { color: siteColor, borderRadius } = wasteDisposalSiteMap[categoryId];

    const toggleShowMoreButton = () => {
        setShowMoreInfo(!showMoreInfo);
    }

    const { container: backgroundColor, text: color, border } = useThemeColor();

    return (
        <Pressable style={[styles.container, {backgroundColor, borderColor: border}]}>
            <Text style={[styles.nameContainer, {color}]}>{name}</Text>
            <View style={styles.wasteDisposalContainer}>
                <View style={[styles.iconContainer, { backgroundColor: siteColor, borderRadius: borderRadius }]}>
                    <Ionicons name={'trash'} size={20} color={'white'} />
                </View>
                <Text style={[styles.wasteDisposalText, {color}]}>{wasteDisposalSiteName}</Text>
            </View>
            {
                showMoreInfo &&
                <View>
                    <Text style={{color}}>{info}</Text>
                </View>
            }
            <View style={styles.showMoreContainer}>
                <Pressable style={styles.showMoreButton} onPress={toggleShowMoreButton}>
                    <Ionicons style={styles.showMoreIcon} name={showMoreInfo ? 'chevron-up' : 'chevron-down'} size={18} color={color} />
                    <Text style={{color}}>Rodyti { showMoreInfo ? "mažiau": "daugiau" }</Text>
                </Pressable>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        width: '100%',
        marginVertical: 4,
        borderWidth: 1
    },
    iconContainer: {
        padding: 4,
    },
    nameContainer: {
        fontSize: 18,
        width: '100%',
        fontWeight: 500,
        paddingBottom: 6,
    },
    wasteDisposalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        width: '100%',
        gap: 10,
    },
    wasteDisposalText: {
        fontSize: 18,
        opacity: 0.7
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