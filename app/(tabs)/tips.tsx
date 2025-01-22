import { ScrollView } from 'react-native';
import { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import TipsContainer from '@/components/tips/TipsContainer';
import WasteSiteList from '@/components/tips/WasteSiteList';

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
