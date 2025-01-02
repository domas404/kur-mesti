interface labelCategoryMap {
    [id: string]: string
}

export const wasteCategoryMap: labelCategoryMap = {
    "plastic": "Plastikinė pakuotė",
    "paper": "Popieriaus ir kartono pakuotė",
    "metal": "Metalinė pakuotė",
    "wooden": "Medinė pakuotė",
    "fabric": "Tekstilė",
    "glass": "Stiklinė pakuotė",
    "combined": "Kombinuota pakuotė",
}

export const labelCategoryList = [
    { name: 'Plastikinė pakuotė', id: 'plastic' },
    { name: 'Popieriaus ir kartono pakuotė', id: 'paper' },
    { name: 'Metalinė pakuotė', id: 'metal' },
    { name: 'Medinė pakuotė', id: 'wooden' },
    { name: 'Tekstilė', id: 'fabric' },
    { name: 'Stiklinė pakuotė', id: 'glass' },
    { name: 'Kombinuota pakuotė', id: 'combined' },
];