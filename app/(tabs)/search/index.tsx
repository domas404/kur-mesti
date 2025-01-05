import { Image, StyleSheet, ScrollView, SafeAreaView, View, Text, Pressable, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import WasteCategory from '@/components/WasteCategory'
import SearchBar from '@/components/SearchBar';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

import { wasteCategoryList } from '@/data/waste-categories';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useState } from 'react';
import SearchResults from '@/components/SearchResults';

export default function Search() {

	const [searchInput, setSearchInput] = useState<string>('');

	const updateSearchInput = (text: string) => {
		setSearchInput(text);
	}

	const clearSearchInput = () => {
		setSearchInput('');
	}

	const backgroundColor = useThemeColor({}, 'container');
	const color = useThemeColor({}, 'text');
	const background = useThemeColor({}, 'background');

	const mappedCategories = wasteCategoryList.map((item, index) => {
		return (
			<WasteCategory key={index} name={item.name} icon={item.icon} id={item.id} />
		);
	});

	return (
		<SafeAreaProvider>
			<SafeAreaView>
				<ScrollView stickyHeaderIndices={[0]} keyboardShouldPersistTaps={'handled'} >
					<View style={[styles.searchContainer, {backgroundColor: background}]}>
						<SearchBar
							searchInput={searchInput}
							updateSearchInput={updateSearchInput}
							clearSearchInput={clearSearchInput}
						/>
						{/* <Text style={{ color: 'white' }}>{searchInput}</Text> */}
					</View>
					{
						searchInput === '' ?
						<>
							<Link href={'./search/labeling'} style={[styles.labelingContainer, {backgroundColor}]} asChild>
								<Pressable>
									<View style={styles.labelingHeader}>
										<Ionicons name={'newspaper-outline'} size={36} color={color} />
										<Text style={[styles.labelingTitle, {color}]}>Pakuočių ženklinimas</Text>
									</View>
									<Ionicons name={'arrow-forward'} size={28} color={color} />
								</Pressable>
							</Link>
							{/* <Text style={{color, paddingHorizontal: 30}}>Ieškoti pagal kategoriją</Text> */}
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
		paddingTop: 40,
		position: 'absolute',
		zIndex: 2,
		width: '100%',
		paddingBottom: 10,
	},
	labelingContainer: {
		height: 100,
		backgroundColor: 'white',
		marginHorizontal: 10,
		marginVertical: 20,
		borderRadius: 20,
		boxShadow: '0 5 12 rgba(0, 0, 0, 0.1)',
		flexDirection: 'row',
		alignItems: 'center',
		padding: 20,
		gap: 16,
		justifyContent: 'space-between'
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
	}
});
