import { Image, StyleSheet, ScrollView, SafeAreaView, View, Text, Pressable } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import WasteCategory from '@/components/WasteCategory'
import SearchBar from '@/components/SearchBar';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

import { wasteCategoryList } from '@/data/waste-categories';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function Search() {

	const backgroundColor = useThemeColor({}, 'container');
	const color = useThemeColor({}, 'text');

	const mappedCategories = wasteCategoryList.map((item, index) => {
		return (
			<WasteCategory key={index} name={item.name} icon={item.icon} id={item.id} />
		);
	});

	return (
		<SafeAreaProvider>
			<SafeAreaView>
				<ScrollView stickyHeaderIndices={[0]}>
					<View style={styles.searchContainer}>
						<SearchBar />
					</View>
					<Link href={'./search/labeling'} style={[styles.labelingContainer, {backgroundColor}]} asChild>
						<Pressable>
							<View style={styles.labelingHeader}>
								<Ionicons name={'newspaper-outline'} size={36} color={color} />
								<Text style={[styles.labelingTitle, {color}]}>Pakuočių ženklinimas</Text>
							</View>
							<Ionicons name={'arrow-forward'} size={28} color={color} />
						</Pressable>
					</Link>
					<View style={styles.categoryContainer}>
						{mappedCategories}
					</View>
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

	},
	labelingContainer: {
		height: 100,
		backgroundColor: 'white',
		marginHorizontal: 10,
		marginTop: 30,
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
