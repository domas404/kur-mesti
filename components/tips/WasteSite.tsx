import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useThemeColor } from '@/hooks/useThemeColor';

type WasteSiteImages = {
    [key: string]: (id: string) => any;
}

const wasteSiteImages: WasteSiteImages = {
    paper: require('@/assets/images/paper-bin.png'),
    plastic: require('@/assets/images/plastic-bin.png'),
    glass: require('@/assets/images/glass-bin.png'),
    compost: require('@/assets/images/compost-bin.png'),
    fabric: require('@/assets/images/fabric-bin.png'),
}

type WasteSiteProps = {
    title: string,
    selected: boolean,
    changeWasteSite: (item: string) => void,
    id: string
    // icon: any
}

export default function WasteSite({ title, changeWasteSite, selected, id }: WasteSiteProps) {

    const { tabActive: backgroundColor, text: color } = useThemeColor();

    return (
        <TouchableOpacity
            style={[styles.container, selected && {backgroundColor}]}
            onPress={() => changeWasteSite(id)}
            activeOpacity={0.7}
        >
            <Image
                source={wasteSiteImages[id as string]}
                style={[styles.icon, {opacity: selected ? 1 : 0.6}]}
                contentFit="contain"
                // tintColor={color}
            />
            <Text style={[styles.text, {color}, {opacity: selected ? 1 : 0.7}]}>{title}</Text>
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
        width: 70,

    },
    text: {
        textAlign: 'center',
        height: 40,
        fontSize: 16,
    }
});