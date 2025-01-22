import { StyleSheet, ScrollView, SafeAreaView, View, Text, Pressable } from 'react-native';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import { wasteCategoryList } from '@/data/waste-categories';
import { useThemeColor } from '@/hooks/useThemeColor';
import WasteCategory from '@/components/search/WasteCategory'
import SearchBar from '@/components/search/SearchBar';
import SearchResults from '@/components/search/SearchResults';

export default function Search() {

	const [searchInput, setSearchInput] = useState<string>('');

	const updateSearchInput = (text: string) => {
		setSearchInput(text);
	}

	const clearSearchInput = () => {
		setSearchInput('');
	}

	const { container: backgroundColor, text: color, background, border } = useThemeColor();

	const mappedCategories = wasteCategoryList.map((item, index) => {
		return (
			<WasteCategory key={index} name={item.name} icon={item.icon} id={item.id} />
		);
	});

	return (
		<SafeAreaProvider>
			<SafeAreaView>
				<ScrollView stickyHeaderIndices={[0]} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ paddingBottom: 100 }}>
					<View style={[styles.searchContainer, {backgroundColor: background}]}>
						<SearchBar
							searchInput={searchInput}
							updateSearchInput={updateSearchInput}
							clearSearchInput={clearSearchInput}
						/>
					</View>
					{
						searchInput === '' ?
						<>
							<Link href={'./search/labeling'} style={[styles.labelingContainer, {backgroundColor, borderColor: border}]} asChild>
								<Pressable>
									<View style={styles.labelingHeader}>
										<View style={styles.iconContainer}>
											<MaterialIcons name={'recycling'} size={24} color={'#E4FFE6'} />
										</View>
										<Text style={[styles.labelingTitle, {color}]}>Pakuočių ženklinimas</Text>
									</View>
									<Ionicons name={'arrow-forward'} size={28} color={color} />
								</Pressable>
							</Link>
							<View style={styles.categoryContainer}>
								{mappedCategories}
							</View>
						</>
						:
						<SearchResults searchInput={searchInput} color={color} />
					}
				</ScrollView>
			</SafeAreaView>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	searchContainer: {
		paddingHorizontal: 10,
		paddingTop: 30,
		position: 'absolute',
		zIndex: 2,
		width: '100%',
		paddingBottom: 6,
		elevation: 4
	},
	labelingContainer: {
		height: 100,
		margin: 10,
		borderRadius: 20,
		borderWidth: 1,
		flexDirection: 'row',
		alignItems: 'center',
		padding: 20,
		gap: 16,
		justifyContent: 'space-between',
	},
	categoryContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingHorizontal: 10,
		paddingVertical: 8,
		alignItems: 'flex-start',
		justifyContent: 'space-between',
	},
	labelingTitle: {
        fontSize: 18,
    },
	labelingHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 16
	},
	iconContainer: {
		backgroundColor: '#3B5E47',
		width: 36,
		height: 36,
		borderRadius: 18,
		padding: 6,
	}
});
