import type z from "zod";
import type { accommodationFeatureListValidation } from "../fixtures/Validation";
import type { DateObject } from "react-multi-date-picker";

export interface Props {
  AccommodationId?: number;
}

export type TCreateAccomodation = {
    type: string,
    name: string,
    description: string | null,
    address: string | null,
    city: string | null,
    manufacture_date: string | null,
    latitude: string | null,
    longitude: string | null,
    max_guests: number | null,
    floors: number | null,
    area_sqm: number | null,
    stars: number | null,
    top: boolean,
    total_rooms: number | null,
    has_reception_24h: boolean,
    has_elevator: boolean ,
    check_in_time: string | null,
    check_out_time: string | null,
    built_with_local_materials: boolean,
    allows_local_food_experience: boolean,
    open_start: string,
    open_end: string,
    min_child_age: number,
    max_child_age: number,
    is_active: boolean
    provience?: number | string | null
}

export type TAccommodationResponse = {
  id: number;

  type: { id: number; name: string };
  city: { id: number; name: string; province: {id: number, name:string}} | null;

  name: string;
  description: string | null;
  address: string | null;

  manufacture_date: string | null; 

  latitude: string | null; 
  longitude: string | null; 

  max_guests: number | null;
  floors: number | null;
  area_sqm: number | null;
  stars: number | null;
  top: boolean;
  total_rooms: number | null;

  has_reception_24h: boolean;
  has_elevator: boolean;

  check_in_time: string | null;
  check_out_time: string | null;

  built_with_local_materials: boolean;
  allows_local_food_experience: boolean;
  is_active: boolean;

  open_start: string,
  open_end: string,

  min_child_age: number,
  max_child_age: number,

  created_at: string; 
  updated_at: string; 

};

type City = {
  id: number;
  name: string;
  province: { id: number; name: string }; 
};

export type Type = {
  id: number;
  name: string;
} | {label: string, value: string};

export type AccommodationItem = {
  id: number;
  name: string;
  type: {id: number, name: string} | null;
  city: City | null;
};

export interface Item {
  id?: number;
  name?: string;
  label?: string;
  value?: string | boolean;
}

export interface accommodationTypes{
  id: number;
  name: string;
}
export interface provience{
  id: number;
  name: string;
}

export interface cities{
  id: number;
  name: string;
}

export const YES_NO_OPTIONS = [
  { label: "بله", value: "true" },
  { label: "خیر", value: "false" },
];


export type TCAccommodationFeature = {
    feature: number[] ;
}

export type TAccommodationFeatureResponse = {
    id: number;
    feature: {id: number; title: string};
}


export type TAccommodationImage = {
  image: File;
  main: boolean
}

export type TAccommodationImageResponse = {
  id: number;
  image: string;
  main: boolean;
}

export type TCFeature = {
    title: string;
    type: string;
}

export type TFeatureResponse = {
    id: number;
    title: string;
    type: string;
}

export type TFeatureListForm = z.infer<typeof accommodationFeatureListValidation>;

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








