export type TCreateBed = {
    name: string,
}

export type TBedResponse = {
    id: number;
    name: string;
}

///////////////////////////////////////////////////////////////

export type TCFeature = {
    title: string;
    type: string;
}

export type TFeatureResponse = {
    id: number;
    title: string;
    type: string;
}

//////////////////////////////////////////////////////////

export type TCreateDefaults = {
    min_child_age: number;
    max_child_age: number;
    check_in_time: string;
    check_out_time: string;
}

export type TResponseDefaults = {
    min_child_age: number;
    max_child_age: number;
    check_in_time: string;
    check_out_time: string;
}