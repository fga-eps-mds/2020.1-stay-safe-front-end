export type ParamOccurrence = {
    params: {
        occurrence: {
            id_occurrence: number;
            location: [number, number];
            gun: string;
            occurrence_date_time: string;
            register_date_time: string;
            occurrence_type: string;
            physical_aggression: boolean;
            police_report: boolean;
            victim: boolean;
        };
    };
};
