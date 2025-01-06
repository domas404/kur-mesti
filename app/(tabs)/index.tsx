import { Image, StyleSheet, Platform } from 'react-native';

import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { Link } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';
import ScheduleWidget from '@/components/schedule/ScheduleWidget';

export default function HomeScreen() {

	const backgroundColor = useThemeColor({}, 'container');
	const color = useThemeColor({}, 'text');

	return (
		<SafeAreaProvider>
			<SafeAreaView>
				<ScrollView>
					<ScheduleWidget />
					{/* <View style={styles.funFactContainer}>
						<View style={styles.funFactHeader}>
							<Text style={styles.funFactHeaderText}>Ar žinojote?</Text>
							<View style={styles.funFactIconContainer}>
								<Ionicons name="close" size={24} color={'#fff'} />
							</View>
						</View>
						<Text style={styles.funFact}>Vienas lietuvis per metus išrūšiuoja 10 kg atliekų.</Text>
					</View> */}
					<View style={styles.shortcutContainer}>
						<Link href="./tips" style={[styles.shortcutLink, {backgroundColor}]} asChild>
							<Pressable style={styles.shortcut}>
								<Ionicons name="book-outline" size={36} color={color} />
								<Text style={[styles.shortcutText, {color}]}>Rūšiavimo atmintinė</Text>
							</Pressable>
						</Link>
						<Link href="./search" style={[styles.shortcutLink, {backgroundColor}]} asChild>
							<Pressable style={styles.shortcut}>
								<Ionicons name="search-outline" size={36} color={color} />
								<Text style={[styles.shortcutText, {color}]}>Rasti kur mesti atlieką</Text>
							</Pressable>
						</Link>
					</View>
				</ScrollView>
			</SafeAreaView>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	shortcutContainer: {
		flexDirection: 'row',
		gap: 10,
		boxSizing: 'border-box',
		width: '100%',
		paddingHorizontal: 10,
		paddingVertical: 20,
	},
	shortcutLink: {
		flex: 1,
	},
	shortcut: {
		width: '100%',
		// backgroundColor: '#fff',
		boxShadow: '0 5 12 rgba(0, 0, 0, 0.1)',
		// height: 160,
		justifyContent: 'flex-end',
		aspectRatio: '1/1',
		borderRadius: 20,
		padding: 20,
	},
	shortcutIcon: {
		// width: 50,
	},
	shortcutText: {
		fontSize: 18,
	},
	funFactContainer: {
		marginHorizontal: 10,
		backgroundColor: '#4c4c4c',
		borderRadius: 20,
		padding: 20,
		boxShadow: '0 5 12 rgba(0, 0, 0, 0.1)',
		flexDirection: 'column',
		gap: 10,
		// boxSizing: 'border-box'
	},
	funFactHeader: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	funFactHeaderText: {
		// width: '50%',
		// width: 100,
		// flex: 1,
		color: 'white',
		fontSize: 18,
	},
	funFact: {
		color: 'white',
		fontSize: 14,
	},
	funFactIconContainer: {
		// flex: 1,
		alignSelf: 'flex-end',
	},
});
