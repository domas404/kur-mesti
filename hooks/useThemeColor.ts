import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type ColorName = keyof typeof Colors.light & keyof typeof Colors.dark;

export function useThemeColor(colorName: ColorName | ColorName[]) {
	const theme = useColorScheme() ?? 'light';

	if (Array.isArray(colorName)) {
		const colors = colorName.map((item) => Colors[theme][item]);
		return colors;
	} else {
		return Colors[theme][colorName] as ColorName;
	}
	// const colorFromProps = props[theme];

	// if (colorFromProps) {
	// 	return colorFromProps;
	// } else {
	// }
}
