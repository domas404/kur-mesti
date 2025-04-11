import { useSQLiteContext } from 'expo-sqlite';

export function useDatabase() {

    const db = useSQLiteContext();

    async function getItemsByCategory(category: string) {
        const statement = await db.prepareAsync(
            'SELECT * FROM waste_items WHERE id IN (SELECT item_id FROM waste_categories WHERE category_id=?);'
        );
        try {
            let result = await statement.executeAsync(category);
            // console.log(await result.getAllAsync());
            const data = await result.getAllAsync();
            return data;
        } finally {
            await statement.finalizeAsync();
        }
		// setData(dataFromDb);
	}

    const getItemsByKeyword = async (keyword: string) => {        
        const statement = await db.prepareAsync(
            "SELECT * FROM waste_items WHERE name LIKE ? OR name LIKE ? COLLATE NOCASE;"
        );
        try {
            let result = await statement.executeAsync(`${keyword}%`, `% ${keyword}%`);
            // console.log(await result.getAllAsync());
            const data = await result.getAllAsync();
            return data;
        } finally {
            await statement.finalizeAsync();
        }
    }

    return {
        getItemsByCategory,
        getItemsByKeyword
    }
}
