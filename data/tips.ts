
interface TipList {
    [key: string]: {
        [key: string]: string[]
    }
}

export const tipList: TipList = {
    'plastic': {
        'do': [
            'Buteliai',
            'Visos maisto pakuotės',
            'Maišeliai'
        ],
        'dont': [
            'Dantų šepetėliai, skutimosi peiliukai, higienos reikmenys',
            'Medicinos atliekos, švirkštai',
            'Tepalo bakeliai',
            'Indeliai nuo dažų',
            'Pavojingų medžiagų tara'
        ],
        'tips': [
            'Pakuočių plauti nebūtina, tik prieš išmetant išpilkite jų turinį'
        ]
    },
    'paper': {
        'do': [],
        'dont': [],
        'tips': []
    },
    'glass': {
        'do': [],
        'dont': [],
        'tips': []
    },
    'compost': {
        'do': [],
        'dont': [],
        'tips': []
    },
    'fabric': {
        'do': [],
        'dont': [],
        'tips': []
    }
}