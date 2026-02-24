import type { DateObject } from "react-multi-date-picker";

export type TCreatePeakDate  = {
  date: string;
}

export type TResponsePeakDate  = {
    id: string;
    date: string;
}

export type TPeakDateState = {
  id: string;
  date: DateObject; // used in component state
};

///////////////////////////////////////////////////////////////

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