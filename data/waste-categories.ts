interface WasteCategoryMap {
    [id: string]: string
}

export const wasteCategoryMap: WasteCategoryMap = {
    "auto": "Transporto priemonių dalys",
    "cleaning": "Valymo chemija ir pakuotės",
    "clothing": "Tekstilė, drabužiai ir aksesuarai",
    "construction": "Statybinės atliekos",
    "electronics": "Elektronika",
    "garden": "Sodo ir organinės kilmės atliekos",
    "hazardous": "Pavojingos atliekos",
    "household": "Namų apyvokos atliekos",
    "kitchen": "Virtuvės atliekos",
    "medical": "Medicinos ir higienos atliekos",
    "office": "Kanceliarijos ir biuro atliekos",
    "packaging": "Pakuotės",
}

export const wasteCategoryList = [
    { name: 'Transporto priemonių dalys', icon: 'car', id: 'auto' },
    { name: 'Valymo chemija ir pakuotės', icon: 'flask', id: 'cleaning' },
    { name: 'Tekstilė, drabužiai ir aksesuarai', icon: 'shirt', id: 'clothing' },
    { name: 'Statybinės atliekos', icon: 'hammer', id: 'construction' },
    { name: 'Elektronika', icon: 'tv', id: 'electronics' },
    { name: 'Sodo ir organinės kilmės atliekos', icon: 'flower', id: 'garden' },
    { name: 'Pavojingos atliekos', icon: 'nuclear', id: 'hazardous' },
    { name: 'Namų apyvokos atliekos', icon: 'home', id: 'household' },
    { name: 'Virtuvės atliekos', icon: 'restaurant', id: 'kitchen' },
    { name: 'Medicinos ir higienos atliekos', icon: 'medkit', id: 'medical' },
    { name: 'Kanceliarijos ir biuro atliekos', icon: 'pencil', id: 'office' },
    { name: 'Pakuotės', icon: 'cube', id: 'packaging' },
];