import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';

type Props = {
    searchInput: string,
    updateSearchInput: (text: string) => void,
    clearSearchInput: () => void
}

export default function SearchBar({ searchInput, updateSearchInput, clearSearchInput }: Props) {

    const { container: backgroundColor, text: color, border } = useThemeColor();
    
    return (
        <View style={[styles.container, {backgroundColor, borderColor: border}]}>
            <Ionicons name={'search'} size={24} color={color} />
            <TextInput
                style={[styles.input, {color}]}
                placeholder='Ieškoti...'
                placeholderTextColor={color}
                value={searchInput}
                onChangeText={updateSearchInput}
            />
            {
                searchInput !== '' &&
                <TouchableOpacity onPress={clearSearchInput} activeOpacity={0.7}>
                    <Ionicons name={'close-outline'} size={24} color={color} />
                </TouchableOpacity>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 52,
        borderRadius: 26,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        gap: 10,
        borderWidth: 1,
    },
    input: {
        flex: 1,
        height: 60,
        fontSize: 18
    }
});