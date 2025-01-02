import { useLocalSearchParams } from 'expo-router';
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Stack } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';

import WasteItem from '@/components/WasteItem';

import { wasteItemList } from '@/data/waste-items';
import { wasteCategoryMap } from '@/data/waste-categories';

export default function Page() {
	const { id } = useLocalSearchParams();

	const filteredItems = wasteItemList.filter((item) => {
		if (item.categoryId === id)
			return item;
	})

	const mappedItems = filteredItems.map((item, index) => {
		return (
			<WasteItem key={`${index}-${item.name}`} item={item} />
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
					<ScrollView>
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