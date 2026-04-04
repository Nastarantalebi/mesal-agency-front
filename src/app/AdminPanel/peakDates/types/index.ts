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
