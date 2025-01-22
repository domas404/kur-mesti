import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from "expo-router";

import { labelCategoryList } from '@/data/label-categories';
import LabelCategory from '@/components/search/LabelCategory';

export default function Labeling() {
    
    const mappedItems = labelCategoryList.map((item, index) => {
        return (
            <LabelCategory key={`${index}-${item.name}`} item={item} />
        );
    });

    return (
        <>
            <Stack.Screen
                options={{ title: 'Ženklinimas' }}
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