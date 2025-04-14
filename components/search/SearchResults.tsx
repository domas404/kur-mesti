import { View, Text } from "react-native";
import WasteItem from "./WasteItem";
import { SQLiteProvider } from "expo-sqlite";
import { useEffect, useState } from "react";
import { useDatabase } from "@/hooks/useDatabase";
import { wasteDisposalSiteMap } from "@/data/disposal-sites";

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
            wasteDisposalSiteName: wasteDisposalSiteMap[item.disposal_method].name,
            info: item.instructions,
            source: item.source
        }

        return (
            <WasteItem key={`${index}-${item.name}`} item={row} />
        );
    });

    useEffect(() => {
        getData();
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
    
    return (
        <SQLiteProvider databaseName='waste.db' assetSource={{ assetId: require('@/assets/waste.db') }}>
            <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
                <ResultList keyword={escapedInput.toLowerCase()} color={color} />
            </View>
        </SQLiteProvider>
    );
}