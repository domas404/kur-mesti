import { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useLocalSearchParams, Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';

import { useDatabase } from '@/hooks/useDatabase';
import { wasteDisposalSiteMap } from '@/data/disposal-sites';
import { wasteCategoryMap } from '@/data/waste-categories';
import WasteItem from '@/components/search/WasteItem';
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
			wasteDisposalSiteName: wasteDisposalSiteMap[item.disposal_method].name,
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