export interface IEventData{
    trcid: string,
    title: string,
    details: {
        en:{
            language: string,
            title:string,
            calendarsummary: string,
            shortdescription: string,
            longdescription: string
        }
    },
    location: {
        name: string,
        city:string,
        adress: string,
        zipcode: string,
        latitude: string,
        longitude: string
    },
    urls:[],
    media:[],
    dates:{
        singles:[]
    }

}