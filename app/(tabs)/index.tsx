import { StyleSheet } from 'react-native';

import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { Link } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';
import ScheduleWidget from '@/components/settings/schedule/ScheduleWidget';

export default function HomeScreen() {

	const [backgroundColor, color, border] = useThemeColor(['container', 'text', 'border']);

	return (
		<SafeAreaProvider>
			<SafeAreaView>
				<ScrollView>
					<ScheduleWidget />
					<View style={styles.shortcutContainer}>
						<Link href="./tips" style={[styles.shortcutLink, {backgroundColor, borderColor: border}]} asChild>
							<Pressable style={styles.shortcut}>
								<View style={styles.shortcutIconContainer}>
									<View style={styles.shortcutIconBackground}></View>
									<Ionicons name="book-outline" size={28} color={'#E4FFE6'} />
								</View>
								<Text style={[styles.shortcutText, {color}]}>Rūšiavimo atmintinė</Text>
							</Pressable>
						</Link>
						<Link href="./search" style={[styles.shortcutLink, {backgroundColor, borderColor: border}]} asChild>
							<Pressable style={styles.shortcut}>
								<View style={styles.shortcutIconContainer}>
									<View style={styles.shortcutIconBackground}></View>
									<Ionicons name="search-outline" size={28} color={'#E4FFE6'} />
								</View>
								<Text style={[styles.shortcutText, {color}]}>Rasti kur mesti atlieką</Text>
							</Pressable>
						</Link>
					</View>
					{/* <View style={[styles.funFactContainer, {backgroundColor, borderColor: border}]}>
						<View style={styles.funFactHeader}>
							<Text style={styles.funFactHeaderText}>Ar žinojote?</Text>
							<View style={styles.funFactIconContainer}>
								<Ionicons name={'ellipsis-vertical'} size={24} color={'#fff'} />
							</View>
						</View>
						<Text style={styles.funFact}>Vienas lietuvis per metus vidutiniškai išrūšiuoja 10 kg atliekų.</Text>
					</View> */}
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
		paddingBottom: 10,
	},
	shortcutLink: {
		flex: 1,
	},
	shortcut: {
		width: '100%',
		borderWidth: 1,
		justifyContent: 'flex-end',
		aspectRatio: '1/1',
		borderRadius: 20,
		padding: 20,
		gap: 10,
	},
	shortcutIcon: {
		// width: 50,
	},
	shortcutIconContainer: {
		backgroundColor: '#3B5E47',
		borderRadius: 8,
		height: 60,
		width: 72,
		borderTopLeftRadius: 60,
		borderBottomRightRadius: 60,
		alignItems: 'center',
		justifyContent: 'center',
	},
	shortcutIconBackground: {
		backgroundColor: '#76B27E',
		borderRadius: 8,
		position: 'absolute',
		height: 60,
		width: 72,
		borderTopLeftRadius: 60,
		borderBottomRightRadius: 60,
		
		left: -16,
		top: -12,
		transform: 'rotate(-30deg)',
		zIndex: -1
	},
	shortcutText: {
		fontSize: 18,
	},
	funFactContainer: {
		marginHorizontal: 10,
		// backgroundColor: '#4c4c4c',
		borderRadius: 20,
		padding: 20,
		// boxShadow: '0 5 12 rgba(0, 0, 0, 0.1)',
		borderWidth: 1,
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
		fontSize: 16,
	},
	funFactIconContainer: {
		// flex: 1,
		alignSelf: 'flex-end',
	},
});
