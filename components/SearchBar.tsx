import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, TextInput, NativeSyntheticEvent, TextInputChangeEventData, TouchableOpacity } from 'react-native';

// type WasteCategoryProps = {
//     name: string,
//     icon: any
// }

type Props = {
    searchInput: string,
    updateSearchInput: (text: string) => void,
    clearSearchInput: () => void
}

export default function SearchBar({ searchInput, updateSearchInput, clearSearchInput }: Props) {

    const backgroundColor = useThemeColor({}, 'container');
    const color = useThemeColor({}, 'text');
    const border = useThemeColor({}, 'border');
    
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
        // borderColor: '#e1e1e1',
        // boxShadow: '0 5 12 rgba(0, 0, 0, 0.1)'
    },
    input: {
        flex: 1,
        height: 60,
        fontSize: 18
    }
});