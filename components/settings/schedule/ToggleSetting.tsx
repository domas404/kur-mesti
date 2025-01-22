import { useThemeColor } from "@/hooks/useThemeColor";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
    name: string;
    setting: boolean;
    setSetting: (value: boolean) => void;
}

export default function ToogleSetting({ name, setting, setSetting }: Props) {

    const { text: color, tintLight, tab: tabColor, tabActive: tabActiveColor } = useThemeColor();

    return (
        <View style={styles.setting}>
            <Text style={[styles.settingText, {color}]}>{name}</Text>
            <TouchableOpacity
                style={[
                    styles.toggleContainer,
                    setting ? { backgroundColor: tintLight } : { backgroundColor: tabActiveColor }
                ]}
                onPress={() => setSetting(!setting)}
                activeOpacity={0.7}
            >
                <View
                    style={[
                        styles.toggle,
                        setting ? { right: 0, backgroundColor: tabActiveColor } : { left: 0, backgroundColor: tabColor },
                    ]}
                ></View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    setting: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    settingText: {
        fontSize: 18,
    },
    toggleContainer: {
        width: 54,
        height: 28,
        borderRadius: 14,
        position: 'relative',
    },
    toggle: {
        width: 20,
        height: 20,
        margin: 4,
        borderRadius: 12,
        backgroundColor: 'white',
        borderColor: 'white',
        position: 'absolute',
    }
});