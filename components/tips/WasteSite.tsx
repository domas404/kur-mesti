import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useThemeColor } from '@/hooks/useThemeColor';

const image = require('@/assets/images/icons/bin.png');

type WasteSiteProps = {
    title: string,
    selected: boolean,
    changeWasteSite: (item: string) => void,
    id: string
    // icon: any
}

export default function WasteSite({ title, changeWasteSite, selected, id }: WasteSiteProps) {

    const backgroundColor = useThemeColor({}, "tabActive");
    const color = useThemeColor({}, "text");

    return (
        <TouchableOpacity
            style={[styles.container, selected && {backgroundColor}]}
            onPress={() => changeWasteSite(id)}
            activeOpacity={0.7}
        >
            <Image
                source={image}
                style={styles.icon}
                contentFit="cover"
                tintColor={color}
            />
            <Text style={[styles.text, {color}]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderRadius: 20,
        width: 130,
        marginVertical: 10,
        marginHorizontal: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    selectedContainer: {
        backgroundColor: '#444',
    },
    icon: {
        height: 70,
        width: 70
    },
    text: {
        textAlign: 'center',
        height: 40,
        fontSize: 16,
    }
});