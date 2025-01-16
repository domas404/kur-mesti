import { Tabs } from 'expo-router';
import React from 'react';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Ionicons from '@expo/vector-icons/Ionicons';
import SettingsButton from '@/components/settings/SettingsButton';

export default function TabLayout() {
	const colorScheme = useColorScheme();
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
				headerShown: false,
				tabBarStyle: {
					height: 64,
					paddingTop: 5,
					borderRadius: 20,
					margin: 10,
					position: 'absolute',
				},
				tabBarHideOnKeyboard: true,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Pradžia',
					headerShown: true,
					headerTitleAlign: 'center',
					headerTitle: 'Kur mesti?',
					tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />,
					headerLeft: () => (
						<SettingsButton />
					),
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					title: 'Paieška',
					tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? "search" : "search-outline"} size={24} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="tips"
				options={{
					title: 'Atmintinė',
					headerShown: true,
					headerTitleAlign: 'center',
					tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? "book" : "book-outline"} size={24} color={color} />,
				}}
			/>
		</Tabs>
	);
}
