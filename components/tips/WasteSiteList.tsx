import { View, StyleSheet } from "react-native"
import { ScrollView } from "react-native-gesture-handler";
import { useThemeColor } from "@/hooks/useThemeColor";
import WasteSite from "./WasteSite"

type Props = {
    selectedWasteSite: string;
    changeWasteSite: (item: string) => void;
    wasteSiteList: { id: string, title: string }[]
}

export default function WasteSiteList({ selectedWasteSite, changeWasteSite, wasteSiteList }: Props) {

    const { container: backgroundColor } = useThemeColor();

    const mappedWasteSites = wasteSiteList.map((item, index) => {
        return (
            <WasteSite
                key={`${item.id}-${index}`}
                title={item.title}
                changeWasteSite={changeWasteSite}
                selected={item.id === selectedWasteSite}
                id={item.id}
            />
        );
    })

    return (
        <View style={{height: 160}}>
            <ScrollView horizontal>
                <View style={[styles.container, {backgroundColor}]}>
                    {mappedWasteSites}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    }
});