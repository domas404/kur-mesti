import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useThemeColor } from '@/hooks/useThemeColor';

type Props = {
    item: {
        name: string,
        icon: any,
        info: string,
        source: string
    },
    image: any
}

export default function LabelItem({ item, image }: Props) {

    const [showMoreInfo, setShowMoreInfo] = useState<boolean>(false);
    const { name, icon, info, source } = item;

    const toggleShowMoreButton = () => {
        setShowMoreInfo(!showMoreInfo);
    }

    const { container: backgroundColor, text: color, border } = useThemeColor();

    return (
        <Pressable style={[styles.container, { backgroundColor, borderColor: border }]}>
            <View style={styles.wasteDisposalContainer}>
                <View style={styles.iconContainer}>
                    <Image
                        source={image}
                        style={styles.icon}
                        contentFit="cover"
                        tintColor={color}
                    />
                </View>
                <Text style={[styles.wasteDisposalText, {color}]}>{name}</Text>
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
        width: 36,
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
        gap: 20,
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
    },
    icon: {
        height: 50,
        width: 37,
    }
});