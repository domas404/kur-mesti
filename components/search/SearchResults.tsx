import { View, Text } from "react-native";
import { wasteItemList } from "@/data/waste-items";
import WasteItem from "./WasteItem";
import { SQLiteProvider } from "expo-sqlite";
import { useEffect, useState } from "react";
import { useDatabase } from "@/hooks/useDatabase";
import { wasteDisposalSiteNameMap } from "@/data/waste-categories";

type Props = {
    searchInput: string;
    color: string
}

type WasteItemDb = {
	id: string,
	name: string,
	disposal_method: string,
	disposal_method_alt: string,
	instructions: string,
	source: string,
}

const ResultList = ({ keyword, color }: { keyword: string, color: string }) => {

    const [data, setData] = useState<WasteItemDb[] | undefined>(undefined);
    
    const { getItemsByKeyword } = useDatabase();

    async function getData() {
        const dataFromDb = await getItemsByKeyword(keyword) as WasteItemDb[];
        setData(dataFromDb);
    }

    const mappedItems = data?.map((item, index) => {

        const row = {
            categoryId: item.disposal_method,
            name: item.name,
            icon: 'book',
            wasteDisposalSiteName: wasteDisposalSiteNameMap[item.disposal_method],
            info: item.instructions,
            source: item.source
        }

        return (
            <WasteItem key={`${index}-${item.name}`} item={row} />
        );
    });

    useEffect(() => {
        console.log(keyword);
        // if (data === undefined)
            getData();
            // getItemsByKeyword('pop');
    }, [keyword]);

    return (
        <>
            {
                (mappedItems && mappedItems.length > 0) ? mappedItems :
                <View style={{}}>
                    <Text style={{color, textAlign: 'center', marginVertical: 10}}>Nieko nerasta</Text>
                </View>
            }
        </>
    )
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
        <SQLiteProvider databaseName='waste.db' assetSource={{ assetId: require('@/assets/waste.db') }}>
            <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
                <ResultList keyword={searchInput} color={color} />
                {/* {
                    mappedItems.length > 0 ? mappedItems :
                    <View style={{}}>
                        <Text style={{color, textAlign: 'center', marginVertical: 10}}>Nieko nerasta</Text>
                    </View>
                } */}
            </View>
        </SQLiteProvider>
    );
}