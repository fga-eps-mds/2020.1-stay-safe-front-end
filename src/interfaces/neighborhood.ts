export interface Neighborhood {
    id_neighborhood: number;
    city: string;
    state: string;
    neighborhood: string;
    statistics: Statistics;
}

interface Statistics {
    average: number;
    lighting: number;
    movement_of_people: number;
    police_rounds: number;
}
