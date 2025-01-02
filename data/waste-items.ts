type WasteItem = {
    name: string,
    wasteDisposalSiteIcon: string,
    wasteDisposalSiteName: string,
    icon: string,
    info: string,
    source: string,
    categoryId: string,
}

export const wasteItemList: WasteItem[] = [
    { categoryId: 'books', name: 'Knygos', icon: 'library-outline', wasteDisposalSiteIcon: 'library-outline', wasteDisposalSiteName: 'Biblioteka', info: 'Nereikalingas knygas padovanokite bibliotekai arba išmeskite į popieriaus ir kartono (arba pakuočių) konteinerį.', source: 'I made it up' },
    { categoryId: 'books', name: 'Žurnalai', icon: 'library-outline', wasteDisposalSiteIcon: 'trash-outline', wasteDisposalSiteName: 'Popieriaus ir kartono konteineris', info: 'Nereikalingas knygas padovanokite bibliotekai arba išmeskite į popieriaus ir kartono (arba pakuočių) konteinerį.', source: 'I made it up' },
    { categoryId: 'books', name: 'Laikraščiai', icon: 'library-outline', wasteDisposalSiteIcon: 'trash-outline', wasteDisposalSiteName: 'Popieriaus ir kartono konteineris', info: 'Nereikalingas knygas padovanokite bibliotekai arba išmeskite į popieriaus ir kartono (arba pakuočių) konteinerį.', source: 'I made it up' },
    { categoryId: 'books', name: 'Lankstinukai', icon: 'library-outline', wasteDisposalSiteIcon: 'trash-outline', wasteDisposalSiteName: 'Popieriaus ir kartono konteineris', info: 'Nereikalingas knygas padovanokite bibliotekai arba išmeskite į popieriaus ir kartono (arba pakuočių) konteinerį.', source: 'I made it up' },
    { categoryId: 'bags', name: 'Popieriniai maišeliai', icon: 'library-outline', wasteDisposalSiteIcon: 'trash-outline', wasteDisposalSiteName: 'Popieriaus ir kartono konteineris', info: 'Nereikalingas knygas padovanokite bibliotekai arba išmeskite į popieriaus ir kartono (arba pakuočių) konteinerį.', source: 'I made it up' },
];