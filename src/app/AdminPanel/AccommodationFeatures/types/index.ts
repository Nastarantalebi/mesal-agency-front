export type TCFeature = {
    title: string;
    type: string;
}

export type TFeatureResponse = {
    id: number;
    title: string;
    type: string;
}

export type TCRoomTypeFeature = {
    feature: number[] ;
}

export type TRoomTypeFeatureResponse = {
    id: string;
    feature: {id: string; title: string};
}
