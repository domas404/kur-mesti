import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useLocalSearchParams, Stack } from 'expo-router';

import { wasteItemList } from '@/data/waste-items';
import { wasteCategoryMap } from '@/data/waste-categories';
import WasteItem from '@/components/search/WasteItem';

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