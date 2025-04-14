import { View, StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useLocalSearchParams, Stack } from 'expo-router';

import { wasteItemList } from '@/data/waste-items';
import { wasteDisposalSiteNameMap } from '@/data/waste-categories';
import { wasteCategoryMap } from '@/data/waste-categories';
import WasteItem from '@/components/search/WasteItem';
import { useEffect, useState } from 'react';
import { useDatabase } from '@/hooks/useDatabase';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import InfoButton from '@/components/search/InfoButton';

async function clearCache() {
	await FileSystem.deleteAsync(
		FileSystem.documentDirectory + 'SQLite/waste.db',
		{ idempotent: true }
	);
}

type WasteItemDb = {
	id: string,
	name: string,
	disposal_method: string,
	disposal_method_alt: string,
	instructions: string,
	source: string,
}

const DbItems = ({ category_id }: { category_id: string }) => {
	// clearCache();
	const [data, setData] = useState<WasteItemDb[] | undefined>(undefined);

	const { getItemsByCategory } = useDatabase();

	async function getData() {
		const dataFromDb = await getItemsByCategory(category_id) as WasteItemDb[];
		setData(dataFromDb);
	}

	const mappedItems = data?.map((item, index) => {
		const row = {
			categoryId: item.disposal_method,
			name: item.name,
			icon: 'book',
			wasteDisposalSiteName: wasteDisposalSiteNameMap[item.disposal_method],
			info: item.instructions,
			source: item.source
		}
		return (
			<WasteItem key={`${index}-${item.name}`} item={row} />
		);
	});

	useEffect(() => {
		if (data === undefined)
			getData();
	}, [data]);

	return (
		<>{mappedItems}</>
	);
}

export default function Page() {
	const { id } = useLocalSearchParams();
	return (
		<>
			<Stack.Screen
				options={{
					title: wasteCategoryMap[id as string],
					// headerShown: true,
					headerRight: () => <InfoButton />,
				}}
			/>
			<SafeAreaProvider>
				<SafeAreaView>
					<ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
						<SQLiteProvider databaseName='waste.db' assetSource={{ assetId: require('@/assets/waste.db') }}>
							<View style={styles.itemsContainer}>
								<DbItems category_id={id as string} />
							</View>
						</SQLiteProvider>
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