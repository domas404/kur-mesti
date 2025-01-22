import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useLocalSearchParams, Stack } from 'expo-router';

import { labelItemList } from '@/data/label-items';
import { wasteCategoryMap } from "@/data/label-categories";
import LabelItem from '@/components/search/LabelItem';

type LabelImages = {
    [id: string]: string
}

const labelImages: LabelImages = {
    pet_1: require('@/assets/images/labels/pet_1.png'),
    hdpe_2: require('@/assets/images/labels/hdpe_2.png'),
    pvc_3: require('@/assets/images/labels/pvc_3.png'),
    ldpe_4: require('@/assets/images/labels/ldpe_4.png'),
    pp_5: require('@/assets/images/labels/pp_5.png'),
    ps_6: require('@/assets/images/labels/ps_6.png'),
    other_7: require('@/assets/images/labels/other_7.png'),

    pap_20: require('@/assets/images/labels/pap_20.png'),
    pap_21: require('@/assets/images/labels/pap_21.png'),
    pap_22: require('@/assets/images/labels/pap_22.png'),

    fe_40: require('@/assets/images/labels/fe_40.png'),
    alu_41: require('@/assets/images/labels/alu_41.png'),

    for_50: require('@/assets/images/labels/for_50.png'),
    for_51: require('@/assets/images/labels/for_51.png'),

    tex_60: require('@/assets/images/labels/tex_60.png'),
    tex_61: require('@/assets/images/labels/tex_61.png'),

    gl_70: require('@/assets/images/labels/gl_70.png'),
    gl_71: require('@/assets/images/labels/gl_71.png'),
    gl_72: require('@/assets/images/labels/gl_72.png'),

    c_80: require('@/assets/images/labels/c_80.png'),
    c_81: require('@/assets/images/labels/c_81.png'),
    c_82: require('@/assets/images/labels/c_82.png'),
    c_83: require('@/assets/images/labels/c_83.png'),
    c_84: require('@/assets/images/labels/c_84.png'),
    c_85: require('@/assets/images/labels/c_85.png'),
}

export default function Page() {
    const { id } = useLocalSearchParams();

    const filteredItems = labelItemList.filter((item) => {
        if (item.categoryId === id)
            return item;
    });

    const mappedItems = filteredItems.map((item, index) => {
        return (
            <LabelItem key={`${index}-${item.name}`} item={item} image={labelImages[item.icon] as string} />
        );
    });

    return (
        <>
            <Stack.Screen
                options={{
                    title: wasteCategoryMap[id as string],
                }}
            />
            <SafeAreaProvider>
                <SafeAreaView>
                    <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                        <View style={styles.itemsContainer}>
                            {mappedItems}
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </SafeAreaProvider>
        </>
    );
}

const styles = StyleSheet.create({
    itemsContainer: {
        padding: 10,
    }
});