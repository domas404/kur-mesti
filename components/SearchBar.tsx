import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, TextInput } from 'react-native';

// type WasteCategoryProps = {
//     name: string,
//     icon: any
// }

export default function SearchBar() {

    const backgroundColor = useThemeColor({}, 'container');
    const color = useThemeColor({}, 'text');
    
    return (
        <View style={[styles.container, {backgroundColor}]}>
            <Ionicons name={'search'} size={24} color={color} />
            <TextInput style={[styles.input, {color}]} placeholder='Ieškoti...' placeholderTextColor={color} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: 'white',
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        gap: 10,
        boxShadow: '0 5 12 rgba(0, 0, 0, 0.1)'
    },
    input: {
        flex: 1,
        height: 60,
        fontSize: 18
    }
});