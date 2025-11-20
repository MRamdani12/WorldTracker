export type CityType = {
    cityName: string;
    country: string;
    countryCode: string;
    date: string;
    notes?: string;
    position: {
        lat: number;
        lng: number;
    };
    id: number;
};
