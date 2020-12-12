export interface CityCrimes {
    name: string;
    crimes: Array<Crimes>;
}

export interface Crimes {
    nature: string;
    quantity: number;
}
