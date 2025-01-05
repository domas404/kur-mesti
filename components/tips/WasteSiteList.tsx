import { View, Text, StyleSheet } from "react-native"
import WasteSite from "./WasteSite"
import { ScrollView } from "react-native-gesture-handler";
import { useThemeColor } from "@/hooks/useThemeColor";



interface WasteSiteListProps {
    selectedWasteSite: string;
    changeWasteSite: (item: string) => void;
    wasteSiteList: { id: string, title: string }[]
}

export default function WasteSiteList({ selectedWasteSite, changeWasteSite, wasteSiteList }: WasteSiteListProps) {

    const backgroundColor = useThemeColor({}, 'container');

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
        // height: 100,
        // backgroundColor
    }
});