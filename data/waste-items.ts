type WasteItem = {
    name: string,
    // wasteDisposalSiteIcon: string,
    wasteDisposalSiteName: string,
    icon: string,
    info: string,
    source: string,
    categoryId: string,
}

export const wasteItemList: WasteItem[] = [
    {
        categoryId: 'hazardous',
        name: 'Klijai',
        icon: 'library-outline',
        // wasteDisposalSiteIcon: 'library-outline',
        wasteDisposalSiteName: 'Didelių gabaritų atliekų aikštelė',
        info: '',
        source: 'https://www.vaatc.lt/apie-bendrove/visuomenes-informavimas/ekskursijos-i-savartyna-ir-mba-2-2/'
    },
    {
        categoryId: 'hazardous',
        name: 'Dažai ir lakai',
        icon: 'library-outline',
        // wasteDisposalSiteIcon: 'library-outline',
        wasteDisposalSiteName: 'Didelių gabaritų atliekų aikštelė',
        info: '',
        source: 'https://www.vaatc.lt/apie-bendrove/visuomenes-informavimas/ekskursijos-i-savartyna-ir-mba-2-2/'
    },
    {
        categoryId: 'hazardous',
        name: 'Hidraulinė, variklio ir pavarų dėžės tepalinė alyva',
        icon: 'library-outline',
        // wasteDisposalSiteIcon: 'library-outline',
        wasteDisposalSiteName: 'Didelių gabaritų atliekų aikštelė',
        info: '',
        source: 'https://www.vaatc.lt/apie-bendrove/visuomenes-informavimas/ekskursijos-i-savartyna-ir-mba-2-2/'
    },
    {
        categoryId: 'fabric',
        name: 'Užuolaidos',
        icon: 'library-outline',
        // wasteDisposalSiteIcon: 'library-outline',
        wasteDisposalSiteName: 'Tekstilės priėmimo punktai',
        info: '',
        source: 'https://www.vaatc.lt/apie-bendrove/visuomenes-informavimas/ekskursijos-i-savartyna-ir-mba-2-2/'
    },
    {
        categoryId: 'fabric',
        name: 'Patalynė',
        icon: 'library-outline',
        // wasteDisposalSiteIcon: 'library-outline',
        wasteDisposalSiteName: 'Tekstilės priėmimo punktai',
        info: '',
        source: 'https://www.vaatc.lt/apie-bendrove/visuomenes-informavimas/ekskursijos-i-savartyna-ir-mba-2-2/'
    },
    {
        categoryId: 'paper',
        name: 'Knygos',
        icon: 'library-outline',
        // wasteDisposalSiteIcon: 'library-outline',
        wasteDisposalSiteName: 'Popieriaus ir kartono konteineris',
        info: '',
        source: 'https://www.vaatc.lt/apie-bendrove/visuomenes-informavimas/ekskursijos-i-savartyna-ir-mba-2-2/'
    },
    {
        categoryId: 'plastic',
        name: 'Skardinės nuo šunų ar kačių ėdalo',
        icon: 'library-outline',
        // wasteDisposalSiteIcon: 'library-outline',
        wasteDisposalSiteName: 'Plastiko ir metalo konteineris',
        info: '',
        source: 'https://www.vaatc.lt/apie-bendrove/visuomenes-informavimas/ekskursijos-i-savartyna-ir-mba-2-2/'
    },
    {
        categoryId: 'glass',
        name: 'Stiklainiai',
        icon: 'library-outline',
        // wasteDisposalSiteIcon: 'library-outline',
        wasteDisposalSiteName: 'Stiklo konteineris',
        info: '',
        source: 'https://www.vaatc.lt/apie-bendrove/visuomenes-informavimas/ekskursijos-i-savartyna-ir-mba-2-2/'
    },
    {
        categoryId: 'compost',
        name: 'Kavos tirščiai',
        icon: 'library-outline',
        // wasteDisposalSiteIcon: 'library-outline',
        wasteDisposalSiteName: 'Kompostas',
        info: '',
        source: 'https://www.vaatc.lt/apie-bendrove/visuomenes-informavimas/ekskursijos-i-savartyna-ir-mba-2-2/'
    },
];