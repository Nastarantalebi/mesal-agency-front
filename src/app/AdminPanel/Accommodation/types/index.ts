

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

  open_start: string | null,
  open_end: string | null,

  created_at: string; 
  updated_at: string; 

};


export interface Item {
  id?: number;
  name?: string;
  value?: string;
  label?: string;
}

export interface accommodationTypes{
  id?: number;
  name?: string;
}
export interface provience{
  id?: number;
  name?: string;
}

export interface cities{
  id?: number;
  name?: string;
}

export const YES_NO_OPTIONS: Item[] = [
  { label: "بله", value: "true" },
  { label: "خیر", value: "false" },
];


export type TCAccommodationFeature = {
    feature: number[] ;
}

export type TAccommodationFeatureResponse = {
    id: string;
    feature: {id: string; title: string};
}


export type TAccommodationImage = {
  image: string;
  main: boolean
}

export type TAccommodationImageResponse = {
  id: number;
  image: string;
  main: boolean;
}





