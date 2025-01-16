import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { useState } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';

type WasteSiteColorMap = {
    [id: string]: string
}

const wasteSiteColorMap: WasteSiteColorMap = {
    hazardous: '#db3030',
    fabric: '#4d5473',
    glass: '#46995a',
    plastic: '#cca516',
    paper: '#214fc2',
    compost: '#523a20'
}

type WasteItem = {
    categoryId: string,
    name: string,
    icon: any,
    // wasteDisposalSiteIcon: any,
    wasteDisposalSiteName: string,
    info: string,
    source: string
}

type WasteItemProps = {
    item: WasteItem,
}

export default function WasteItem({ item }: WasteItemProps) {

    const [showMoreInfo, setShowMoreInfo] = useState<boolean>(false);

    const toggleShowMoreButton = () => {
        setShowMoreInfo(!showMoreInfo);
    }

    const [backgroundColor, color, border] = useThemeColor(['container', 'text', 'border']);

    return (
        // <Link style={styles.container} href={`./category/${name}`} asChild>
            <Pressable style={[styles.container, {backgroundColor, borderColor: border}]}>
                <Text style={[styles.nameContainer, {color}]}>{item.name}</Text>
                <View style={styles.wasteDisposalContainer}>
                    <View style={[styles.iconContainer, { backgroundColor: wasteSiteColorMap[item.categoryId] }]}>
                        <Ionicons name={'trash'} size={20} color={'white'} />
                    </View>
                    <Text style={[styles.wasteDisposalText, {color}]}>{item.wasteDisposalSiteName}</Text>
                </View>
                {
                    showMoreInfo &&
                    <View>
                        <Text style={{color}}>{item.info}</Text>
                    </View>
                }
                <View style={styles.showMoreContainer}>
                    <Pressable style={styles.showMoreButton} onPress={toggleShowMoreButton}>
                        <Ionicons style={styles.showMoreIcon} name={showMoreInfo ? 'chevron-up' : 'chevron-down'} size={18} color={color} />
                        <Text style={{color}}>Rodyti { showMoreInfo ? "mažiau": "daugiau" }</Text>
                    </Pressable>
                </View>
            </Pressable>
        // </Link>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        // flex: 1,
        // height: 100,
        // flexDirection: 'row',
        // alignItems: 'center',
        width: '100%',
        marginVertical: 4,
        // gap: 16,
        borderWidth: 1
        // boxShadow: '0 5 12 rgba(0, 0, 0, 0.1)'
    },
    iconContainer: {
        // width: 20,
        // height: 20,
        padding: 4,
        // backgroundColor: 'red',
        borderRadius: 14,
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
        // backgroundColor: 'yellow',
        gap: 10,
        // justifyContent: 'flex-start'
    },
    wasteDisposalText: {
        fontSize: 18,
        opacity: 0.7
    },
    showMoreButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        // backgroundColor: 'pink',
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