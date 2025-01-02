import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { useState } from 'react';

type WasteItem = {
    name: string,
    icon: any,
    wasteDisposalSiteIcon: any,
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

    return (
        // <Link style={styles.container} href={`./category/${name}`} asChild>
            <Pressable style={styles.container}>
                <Text style={styles.nameContainer}>{item.name}</Text>
                <View style={styles.wasteDisposalContainer}>
                    <View style={styles.iconContainer}>
                        <Ionicons name={item.wasteDisposalSiteIcon} size={36} color={'black'} />
                    </View>
                    <Text style={styles.wasteDisposalText}>{item.wasteDisposalSiteName}</Text>
                </View>
                {
                    showMoreInfo &&
                    <View>
                        <Text>{item.info}</Text>
                    </View>
                }
                <View style={styles.showMoreContainer}>
                    <Pressable style={styles.showMoreButton} onPress={toggleShowMoreButton}>
                        <Ionicons style={styles.showMoreIcon} name={showMoreInfo ? 'chevron-up' : 'chevron-down'} size={18} color={'black'} />
                        <Text>Rodyti { showMoreInfo ? "mažiau": "daugiau" }</Text>
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
        boxShadow: '0 5 12 rgba(0, 0, 0, 0.1)'
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
        // backgroundColor: 'yellow',
        gap: 10,
        // justifyContent: 'flex-start'
    },
    wasteDisposalText: {
        fontSize: 18,
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