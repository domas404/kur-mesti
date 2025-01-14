import { Image, StyleSheet, ScrollView, SafeAreaView, View, Text, Pressable, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import WasteCategory from '@/components/WasteCategory'
import SearchBar from '@/components/SearchBar';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
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
	const border = useThemeColor({}, 'border');

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
						{/* <Text style={{ color: 'white' }}>{searchInput}</Text> */}
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
		paddingTop: 30,
		position: 'absolute',
		zIndex: 2,
		width: '100%',
		paddingBottom: 6,
		elevation: 4
		// boxShadow: '0 4 8 #rgba(0,0,0,0.1)'
	},
	labelingContainer: {
		height: 100,
		backgroundColor: 'white',
		marginHorizontal: 10,
		marginVertical: 10,
		borderRadius: 20,
		// boxShadow: '0 5 12 rgba(0, 0, 0, 0.1)',
		borderWidth: 1,
		// borderColor: '#e1e1e1',
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
	},
	iconContainer: {
		backgroundColor: '#3B5E47',
		width: 36,
		height: 36,
		borderRadius: 18,
		padding: 6,
	}
});
