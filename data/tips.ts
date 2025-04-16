
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
            'Dėžutės, indeliai (ledų, majonezo ir pan.)',
            'Buitinių priemonių tara',
            'Maišeliai',
            '„TetraPak“ pakuotės',
            '„Elopak“ pakuotės (pieno, sulčių)',
            'Saldainių popieriukai, traškučių pakeliai ir pan.',
            'Gėrimų išsinešti puodeliai',
            'Metaliniai dangteliai',
            'Gėrimų ir konservų skardinės',
            'Kavos skardinės'
        ],
        'dont': [
            'Tepalo bakeliai',
            'Indeliai nuo dažų',
            'Aušinimo skysčio pakuotės',
            'Smulki ir stambi elektroninė įranga',
            'Pavojingų medžiagų tara',
            'Dantų šepetėliai, skutimosi peiliukai, higienos reikmenys',
            'Medicinos atliekos, švirkštai',
            'Medikamentai'
        ],
        'tips': [
            'Butelius užsukite',
            'Pašalinkite maisto likučius bei išpilkite skysčius',
            'Pakuočių plauti nereikia, svarbu, kad jose nebūtų maisto likučių',
            'Plastikinės pakuotės dažnai pažymimos ženklais PET, HDPE, LDPE, PP',
            'Elektroninę įrangą galite priduoti surinkimo punktuose',
            'Dėl medicininių atliekų priėmimo galite pasiteirauti savo regiono stambiagabaričių atliekų aikštelėje'
        ]
    },
    'paper': {
        'do': [
            'Visų rūšių kartono dėžės',
            'Kartoninės maisto pakuotės',
            'Visų rūšių popieriaus pakuotės',
            'Popieriniai pirkinių maišeliai',
            'Popieriniai maišeliai nuo produktų (miltų, cukraus, druskos ir pan.)',
            'Vokai'
        ],
        'dont': [
            'Sauskelnės, vienkartinės servetėlės, nosinaitės, tualetinis popierius',
            'Popierinės pakuotės su maisto likučiais',
            'Suteptas popierius (tepalais, dažais)',
            'Dokumentų segtuvai',
            'Tapetai'
        ],
        'tips': [
            'Popierius turi būti sausas ir švarus',
            'Sąvaržėlių išsegti nereikia',
            'Gali būti su lipnia juostele',
            'Dėžutes išlankstykite'
        ]
    },
    'glass': {
        'do': [
            'Buteliai',
            'Kita stiklo tara',
            'Stiklainiai be dangtelių',
            'Stiklo pakuočių duženos ir šukės'
        ],
        'dont': [
            'Veidrodžiai',
            'Porcelianas',
            'Krištolas',
            'Stikliniai indai',
            'Keramika',
            'Dezinfekcinių priemonių buteliai',
            'Visos el. lemputės',
            'TV ekranai',
            'Namų langų stiklai',
            'Automobilių stiklai'
        ],
        'tips': [
            'Pakuočių plauti nebūtina, tik išpilti skysčius',
            'Etikečių nulupti nereikia',
            'El. lemputes ir kitą įrangą galite priduoti surinkimo punktuose'
        ]
    },
    'compost': {
        'do': [
            'Sodo ir daržo augmenija',
            'Žolė, lapai, smulkios medienos šakelės',
            'Vaisių ir daržovių likučiai',
            'Arbatos, kavos tirščiai, kiaušinių, riešutų lukštai',
            'Popierius, smulkintas kartonas'
        ],
        'dont': [
            'Mėsa, žuvis, kaulai, pieno produktai, riebalai',
            'Stiklas, plastikas, sintetika',
            'Sergantys augalai, augalai apdoroti cheminėmis priemonėmis',
            'Žurnalai, dažytas ar kitaip chemiškai apdorotas popierius ir kartonas'
        ],
        'tips': [
            'Komposto dėžės dugne paklokite medžio skiedrų, smulkių šakelių ar durpių, tai užtikrina oro pateikimą į kompostą',
            'Stambesnes atliekas susmulkinkite. Tarpusavyje maišykite įvairias kompostuojamas atliekas',
            'Kompostą retsykiais drėkinkite. Jei kompostas pelyja arba atsiranda blogas kvapas, perkaskite arba supurenkite, kad kompostas gautų oro'
        ]
    },
    'fabric': {
        'do': [
            'Drabužius (vasarinius, žieminius, vaikiškus)',
            'Patalynę',
            'Avalynę (poromis)',
            'Rankines',
            'Diržus',
        ],
        'dont': [
            'Kilimų',
            'Suteptų, suplyšusių drabužių',
            'Tekstilės atraižų',
        ],
        'tips': [
            'Daiktai, kuriuos metate į tekstilės konteinerius, turi būti švarūs, tvarkingi ir sudėti į plastikinius maišus',
        ]
    }
}