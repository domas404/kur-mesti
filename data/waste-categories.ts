interface wasteCategoryMap {
    [id: string]: string
}

export const wasteCategoryMap: wasteCategoryMap = {
    // "books": "Knygos",
    // "bags": "Maišeliai",
    // "bulbs": "Lemputės",
    // "cups": "Puodeliai",
    // "cards": "Kortelės",
    // "packages": "Pakuotės",
    // "discs": "Diskai",
    // "paper": "Popierius",
    // "flowers": "Gėlės",
    // "earphones": "Ausinės",
    // "keys": "Raktai",
    // "leaves": "Lapai",

    "hazardous": "Pavojingos atliekos",
    "wood": "Mediena",
    "plastic": "Plastikas",
    "paper": "Popierius",
    "metal": "Metalas",
    "glass": "Stiklas",
    "tires": "Padangos",
    "large": "Didžiosios atliekos",
    "construction": "Statybinės atliekos",
    "batteries": "Baterijos",
    "fabric": "Drabužiai ir tekstilė",
    "lightbulbs": "Lemputės",
    "mercury": "Gyvsidabrio turinčios atliekos",
    "electronic": "Elektroninė įranga",

}

export const wasteCategoryList = [
    { name: 'Pavojingos atliekos', icon: 'nuclear', id: 'hazardous' },
    { name: 'Mediena', icon: 'cube', id: 'wood' },
    { name: 'Plastikas', icon: 'card', id: 'plastic' },
    { name: 'Popierius', icon: 'newspaper', id: 'paper' },
    { name: 'Metalas', icon: 'cog', id: 'metal' },
    { name: 'Stiklas', icon: 'glasses', id: 'glass' },
    { name: 'Padangos', icon: 'disc', id: 'tires' },
    { name: 'Didžiosios atliekos', icon: 'bed', id: 'large' },
    { name: 'Statybinės atliekos', icon: 'hammer', id: 'construction' },
    { name: 'Baterijos', icon: 'battery-full', id: 'batteries' },
    { name: 'Drabužiai ir tekstilė', icon: 'shirt', id: 'fabric' },
    { name: 'Lemputės', icon: 'bulb', id: 'lightbulbs' },
    { name: 'Gyvsidabrio turinčios atliekos', icon: 'thermometer', id: 'mercury' },
    { name: 'Elektroninė įranga', icon: 'tv', id: 'electronic' },

    // { name: 'Knygos', icon: 'library-outline', id: 'books' },
    // { name: 'Maišeliai', icon: 'bag-outline', id: 'bags' },
    // { name: 'Lemputės', icon: 'bulb-outline', id: 'bulbs' },
    // { name: 'Puodeliai', icon: 'cafe-outline', id: 'cups' },
    // { name: 'Kortelės', icon: 'card-outline', id: 'cards' },
    // { name: 'Pakuotės', icon: 'cube-outline', id: 'packages' },
    // { name: 'Diskai', icon: 'disc-outline', id: 'discs' },
    // { name: 'Popierius', icon: 'document-outline', id: 'paper' },
    // { name: 'Gėlės', icon: 'flower-outline', id: 'flowers' },
    // { name: 'Ausinės', icon: 'headset-outline', id: 'earphones' },
    // { name: 'Raktai', icon: 'key-outline', id: 'keys' },
    // { name: 'Lapai', icon: 'leaf-outline', id: 'leaves' },
];