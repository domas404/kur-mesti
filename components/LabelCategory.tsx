import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { useState } from 'react';

type LabelCategory = {
    name: string,
    id: string
}

type LabelCategoryProps = {
    item: LabelCategory,
}

export default function LabelCategory({ item }: LabelCategoryProps) {

    // const [showMoreInfo, setShowMoreInfo] = useState<boolean>(false);

    // const toggleShowMoreButton = () => {
    //     setShowMoreInfo(!showMoreInfo);
    // }

    return (
        // <Link style={styles.container} href={`./category/${name}`} asChild>
        <Link href={`./labeling/${item.id}`} asChild>
            <Pressable style={styles.container}>
                {/* <Text style={styles.nameContainer}>{item.name}</Text> */}
                <View style={styles.wasteDisposalContainer}>
                    <View style={styles.headerContainer}>
                        <Ionicons name={'cube-outline'} size={36} color={'black'} />
                        <Text style={styles.wasteDisposalText}>{item.name}</Text>
                    </View>
                    <Ionicons name={'arrow-forward'} size={28} color={'black'} />
                </View>
                {/* <View style={styles.showMoreContainer}>
                    <Pressable style={styles.showMoreButton} onPress={toggleShowMoreButton}>
                        <Ionicons style={styles.showMoreIcon} name={showMoreInfo ? 'chevron-up' : 'chevron-down'} size={18} color={'black'} />
                        <Text>Rodyti { showMoreInfo ? "mažiau": "daugiau" }</Text>
                    </Pressable>
                </View> */}
            </Pressable>
        </Link>
        // </Link>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        // paddingTop: 20,
        // paddingBottom: 10,
        // flex: 1,
        // height: 100,
        // flexDirection: 'row',
        // alignItems: 'center',
        width: '100%',
        marginVertical: 4,
        // gap: 16,
        boxShadow: '0 5 12 rgba(0, 0, 0, 0.1)'
    },
    headerContainer: {
        // width: 36,
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
        // backgroundColor: 'yellow',
        // gap: 10,
        justifyContent: 'space-between'
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