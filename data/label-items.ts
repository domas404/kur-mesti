type LabelItem = {
    name: string,
    icon: string,
    info: string,
    source: string,
    categoryId: string,
}

export const labelItemList: LabelItem[] = [
    {
        categoryId: 'plastic',
        name: 'PET',
        icon: 'pet_1',
        info: 'Polietilenlereftalatas, sutrumpintai vadinamas poliesteriu. Ši medžiaga yra plačiai naudojama gaiviųjų gėrimų, mineralinio vandens buteliams ir įvairioms kitoms vartojimo prekių talpoms gaminti. Tai yra populiari maisto ir ne maisto produktų pakavimo medžiaga, nes ji yra nebrangi, lengva, atspari ir perdirbama. PET yra bespalvė, tvirta, medžiaga, pasižyminti švariu ir optiškai lygiu paviršiumi, ji turi puikias deguonies, vandens ir anglies dioksido apsaugines savybes, greitai įkaista ir yra lengvai formuojama. Perdirbtos PET granulės naudojamos sintetinio pluošto, geo-tekstilės gamyboje.',
        source: 'I made it up'
    },
    {
        categoryId: 'plastic',
        name: 'HDPE',
        icon: 'hdpe_2',
        info: 'Nurodo, kad pakuotės sudėtyje yra didelio tankio polietileno. HDPE turi geras apsaugines savybes ir standumą, puikiai tinka trumpo galiojimo produktams pakuoti, dėl to dažnai yra naudojamas pieno talpyklų, sulčių, vandens pakuočių gamybai. Kadangi HDPE turi gerą cheminį atsparumą, jis taip pat naudojamas, šampūno butelių, šiukšlių maišų, bakalėjos ir mažmeninės prekybos krepšių, variklinės alyvos butelių, sviesto ir margarino indelių, buitinių valiklių butelių, jogurto talpų gamyboje. Po perdirbimo galimi produktai: drenažo vamzdžiai, skystų skalbimo ploviklių, aliejaus buteliai, rašikliai, suolai, traukos spintos, grindų plytelės, lauko baldai, tvoros.',
        source: 'I made it up'
    },
    {
        categoryId: 'plastic',
        name: 'PVC',
        icon: 'pvc_3',
        info: 'Šiuo ženklu pažymėti gaminiai yra iš polivinilchlorido, dar kartais vadinamo vinilu. PVC skleidžia ftalatus ir kitas nuodingas chemines medžiagas sąlytyje su produktais, skysčiu ir oru (pvz. naujos vonios užuolaidos kvapas). Dažniausiai naudojama butelių, kepimo aliejaus butelių, skalbimo priemonių butelių, šampūno butelių, maisto pakuočių, vielos ir kabelių ričių, medicininių vamzdelių, plytelių, vamzdynų ir langų gamyboje. Po perdirbimo galimi produktai: segtuvai, paklotai, dailylentės, latakai, grindys, kabeliai.',
        source: 'I made it up'
    },
    {
        categoryId: 'plastic',
        name: 'LDPE',
        icon: 'ldpe_4',
        info: 'Nurodo, kad gaminio sudėtyje yra mažo tankio polietileno. Dėl savo kietumo, lankstumo ir skaidrumo, LDPE naudojamas kaip šilumos sandarinimo medžiaga, taip pat vielos ir kabelių izoliacijos, butelių, šaldyto maisto krepšių, drabužių, baldų, cheminio valymo krepšių gamyboje. Taip dažniausiai žymimi ir pirkinių plastikiniai bei šiukšliadėžių maišai. Po perdirbimo galimi produktai: plėvelės ir lakštai, baldai, komposto dėžės, šiukšlių konteineriai, dailylentės, šiukšlių dėžės.',
        source: 'I made it up'
    },
    {
        categoryId: 'plastic',
        name: 'PP',
        icon: 'pp_5',
        info: 'Nurodo, kad gaminio sudėtyje yra polipropileno. Polipropilenas turi mažiausią tankį. Jis yra labai stiprus ir atsparus chemikalams, gali būti naudojamas atsparioms karščiui talpoms gaminti. Iš PP gaminami butelių kamštukai, stalo įrankiai, indeliai produktų saugojimui, margarino, jogurto pakuotės, atsparūs padėkliukai mikrobangų krosnelėms, indai, sirupo, kečupo buteliai, dangteliai, šiaudeliai, medicininiai buteliai. Polipropileno plaušai naudojami kilimuose, sienų dangose, transporto priemonių sėdynėse. Tokį plastiką galima naudoti karštam maistui ir gėrimams, jis išlaiko pakankamai aukštą temperatūrą – 100 laipsnių pagal Celsijų. Po perdirbimo galimi produktai: signaliniai žibintai, šluotos, šepečiai, auto baterijų dėklai, ledo skreperiai, dviračių stovai, grėbliai, talpos, padėklai.',
        source: 'I made it up'
    },
    {
        categoryId: 'plastic',
        name: 'PS',
        icon: 'ps_6',
        info: 'Nurodo, kad gaminio sudėtyje yra polistireno, dar vadinamo putplasčiu (angl. styrofoam). Ši medžiaga yra labai lengva, puri, primena sustingusias putas. Iš putplasčio gaminami padėkliukai mėsos pakavimui, indeliai karštiems skysčiams ar maisto produktams saugoti, korėtos pakuotės kiaušiniams, vienkartinės lėkštės, apsauginės pakuotės elektronikos prekėms ir žaislams. Iš PP pagamintas pakuotes galima naudoti tik šaltam maistui. Statyboje naudojamos polistireno izoliacinės medžiagos. Taip pat PP medžiaga gali būti naudojama puodelių, peilių, acetilsalicilo rūgšties butelių, kompaktinių diskų įpakavimo gamyboje. Po perdirbimo galimi produktai: šilumos izoliacinės plokštės, šviesos jungikliai, kiaušinių pakuotės, ventiliacijos angos.',
        source: 'I made it up'
    },
    {
        categoryId: 'plastic',
        name: 'OTHER',
        icon: 'other_7',
        info: 'Šiuo ženklu ženklinamas visas kitas plastikas (nr. 7-19), dažnai plastikai, kurie yra sudaryti iš daugiau nei vienos medžiagos. Pavyzdžiui: PC – polikarbonatas, ABS – akrilnitrilo butadieno stirenas, SAN – stireno akrilonitrilas; akrilas ir poliamidas, PLA – polilaktinė rūgštis.',
        source: 'I made it up'
    },
    {
        categoryId: 'paper',
        name: '20 PAP',
        icon: 'pap_20',
        info: 'Nurodo, kad pakuotė pagaminta iš gofruotojo kartono. Gofruotasis kartonas susideda iš vieno arba dviejų išorinių sluoksnių ir iš gofruoto popieriaus sluoksnio arba, daugiasluoksnis – iš keleto tarpinių sluoksnių. Iš jo gaminamos kartoninės dėžės, skirtos pakavimui, siuntiniams.',
        source: 'I made it up'
    },
    {
        categoryId: 'paper',
        name: '21 PAP',
        icon: 'pap_21',
        info: 'Kito popieriaus kategorija, kuri apima mišraus tipo popierių, naudojamą žurnalams, paštui, birių produktų dėžutėms, sausainių dėžutėms ir pan.',
        source: 'I made it up'
    },
    {
        categoryId: 'paper',
        name: '22 PAP',
        icon: 'pap_22',
        info: 'Tai paprastas popierius, naudojamas laiškams, kopijavimo, knygų, atviručių popierius.',
        source: 'I made it up'
    },
    {
        categoryId: 'metal',
        name: '40 FE',
        icon: 'fe_40',
        info: 'Nurodo, kad pakuotės sudėtyje yra plieno. Iš šios medžiagos gaminama metalinės dėžutės, panaudojamos konservavimui, arbatoms, dažams, lakui pakuoti, taip pat aerozolių balionėliai.',
        source: 'I made it up'
    },
    {
        categoryId: 'metal',
        name: '41 ALU',
        icon: 'alu_41',
        info: 'Nurodo, kad pakuotė yra pagaminta iš aliuminio. Tai dažniausiai būna gėrimų arba konservų skardinės.',
        source: 'I made it up'
    },
    {
        categoryId: 'wooden',
        name: '50 FOR',
        icon: 'for_50',
        info: 'Medis (dėžutės, padėklai).',
        source: 'I made it up'
    },
    {
        categoryId: 'wooden',
        name: '51 FOR',
        icon: 'for_51',
        info: 'Kamštis (butelių kamščiai, padėkliukai).',
        source: 'I made it up'
    },
    {
        categoryId: 'fabric',
        name: '60 TEX',
        icon: 'tex_60',
        info: 'Medvilnė.',
        source: 'I made it up'
    },
    {
        categoryId: 'fabric',
        name: '61 TEX',
        icon: 'tex_61',
        info: 'Džiutas.',
        source: 'I made it up'
    },
    {
        categoryId: 'glass',
        name: '70 GL',
        icon: 'gl_70',
        info: 'Bespalvis stiklas (vandens ir gėrimų buteliai, stiklainiai).',
        source: 'I made it up'
    },
    {
        categoryId: 'glass',
        name: '71 GL',
        icon: 'gl_71',
        info: 'Žalias stiklas (gėrimų, aliejaus, sirupų buteliai, vaistų buteliukai).',
        source: 'I made it up'
    },
    {
        categoryId: 'glass',
        name: '72 GL',
        icon: 'gl_72',
        info: 'Rudas stiklas (gėrimų, aliejaus, sirupų buteliai, vaistų buteliukai).',
        source: 'I made it up'
    },
    {
        categoryId: 'combined',
        name: '80 C/...*',
        icon: 'c_80',
        info: 'Kombinuota pakuotė (popierius ir kartonas/įvairūs metalai).',
        source: 'I made it up'
    },
    {
        categoryId: 'combined',
        name: '81 C/...*',
        icon: 'c_81',
        info: 'Kombinuota pakuotė (popierius ir kartonas/plastikas).',
        source: 'I made it up'
    },
    {
        categoryId: 'combined',
        name: '82 C/...*',
        icon: 'c_82',
        info: 'Kombinuota pakuotė (popierius ir kartonas/aliuminis).',
        source: 'I made it up'
    },
    {
        categoryId: 'combined',
        name: '83 C/...*',
        icon: 'c_83',
        info: 'Kombinuota pakuotė (popierius ir kartonas/alavuota skarda).',
        source: 'I made it up'
    },
    {
        categoryId: 'combined',
        name: '84 C/...*',
        icon: 'c_84',
        info: 'Kombinuota pakuotė (popierius ir kartonas/plastikas/aliuminis).',
        source: 'I made it up'
    },
    {
        categoryId: 'combined',
        name: '85 C/...*',
        icon: 'c_85',
        info: 'Kombinuota pakuotė (popierius ir kartonas/plastikas/aliuminis/alavuota skarda).',
        source: 'I made it up'
    },
];