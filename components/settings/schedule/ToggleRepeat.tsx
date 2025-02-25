import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

type Props = {
    repeat: boolean;
    setRepeat: (value: boolean) => void;
}

export default function RepeatNav({ repeat, setRepeat }: Props) {

    const { text: color, tab: tabColor, tabActive: tabActiveColor } = useThemeColor();

    return (
        <View style={[styles.typeContainer]}>
            <TouchableOpacity
                style={[
                    styles.typeTab,
                    {borderTopLeftRadius: 12, borderBottomLeftRadius: 12},
                    {backgroundColor: tabColor},
                    !repeat && { backgroundColor: tabActiveColor}
                ]}
                activeOpacity={0.7}
                onPress={() => setRepeat(false)}
            >
                <Text style={[styles.typeTabText, {color}]}>Vienkartinis</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.typeTab,
                    {borderTopRightRadius: 12, borderBottomRightRadius: 12},
                    {backgroundColor: tabColor},
                    repeat && { backgroundColor: tabActiveColor}
                ]}
                activeOpacity={0.7}
                onPress={() => setRepeat(true)}
            >
                <Text style={[styles.typeTabText, {color}]}>Periodinis</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    typeContainer: {
        flexDirection: 'row',
        borderRadius: 8,
    },
    typeTab: {
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    typeTabText: {
        fontSize: 16
    },
});