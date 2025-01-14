import TipsContainer from '@/components/tips/TipsContainer';
import WasteSiteList from '@/components/tips/WasteSiteList';
import { useState } from 'react';
import { View, Text, Image, StyleSheet, Platform, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const wasteSiteList = [
    { id: 'paper', title: 'Popierius ir kartonas' },
    { id: 'plastic', title: 'Plastikas ir metalas' },
    { id: 'glass', title: 'Stiklas' },
    { id: 'compost', title: 'Kompostas' },
    { id: 'fabric', title: 'Tekstilė' },
];

export default function Tips() {

	const [wasteSite, setWasteSite] = useState<string>('plastic');

	const changeWasteSite = (item: string) => {
		setWasteSite(item);
	}

	return (
		<GestureHandlerRootView>
			<ScrollView contentContainerStyle={{paddingBottom: 100}}>
				<WasteSiteList selectedWasteSite={wasteSite} changeWasteSite={changeWasteSite} wasteSiteList={wasteSiteList}  />
				<TipsContainer selectedWasteSite={wasteSite} />
			</ScrollView>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: 'absolute',
	},
});
