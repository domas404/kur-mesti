import { View, Text } from "react-native";
import { wasteItemList } from "@/data/waste-items";
import WasteItem from "./WasteItem";

type Props = {
    searchInput: string;
    color: string
}

export default function SearchResults({ searchInput, color }: Props) {
    
    const escapedInput = searchInput.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`^${escapedInput}`, "i");

    const filteredItems = wasteItemList.filter((item) => {
        let words = item.name.split(" ");
        let filteredWords = words.filter((word) => regex.test(word));
        if (filteredWords.length > 0)
            return true;
    });

    const mappedItems = filteredItems.map((item, index) => {
        return (
            <WasteItem key={`${index}-${item.name}`} item={item} />
        );
    })
    
    return (
        <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
            {
                mappedItems.length > 0 ? mappedItems :
                <View style={{}}>
                    <Text style={{color, textAlign: 'center', marginVertical: 10}}>Nieko nerasta</Text>
                </View>
            }
        </View>
    );
}