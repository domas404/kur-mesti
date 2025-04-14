type WasteDisposalMap = {
    [id: string]: {
        name: string,
        color: string,
        borderRadius: number
    }
}

export const wasteDisposalSiteMap: WasteDisposalMap = {
    paper: {
        name: 'Popieriaus ir kartono konteineris',
        color: '#214fc2',
        borderRadius: 14
    },
    plastic: {
        name: 'Plastiko ir metalo konteineris',
        color: '#cca516',
        borderRadius: 14
    },
    glass: {
        name: 'Stiklo konteineris',
        color: '#46995a',
        borderRadius: 14
    },
    mixed: {
        name: 'Mišrių atliekų konteineris',
        color: '#555',
        borderRadius: 14
    },
    compost: {
        name: 'Kompostas',
        color: '#523a20',
        borderRadius: 4
    },
    fabric: {
        name: 'Tekstilės konteineris',
        color: '#4d5473',
        borderRadius: 4
    },
    tare: {
        name: 'Taros priėmimo punktai',
        color: '#FF751A',
        borderRadius: 4
    },
    hazardous: {
        name: 'Didelių gabaritų atliekų aikštelė',
        color: '#db3030',
        borderRadius: 4
    },
    electronics: {
        name: 'Elektronikos priėmimo punktai',
        color: '#752CC4',
        borderRadius: 4
    },
    farmacy: {
        name: 'Vaistinė',
        color: '#37B6BD',
        borderRadius: 4
    },
    donate: {
        name: '',
        color: '#555',
        borderRadius: 4
    },
}
