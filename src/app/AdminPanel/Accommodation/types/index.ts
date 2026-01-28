export type TCreateAccomodation = {
    type: string,
    name: string,
    description: string | null,
    address: string | null,
    city: string | null,
    manufacture_date: string | null,
    latitude: string | null,
    longitude: string | null,
    max_guests: string | null,
    floors: string | null,
    area_sqm: string | null,
    stars: string | null,
    total_rooms: string | null,
    has_reception_24h: boolean,
    has_elevator: boolean,
    check_in_time: string | null,
    check_out_time: string | null,
    built_with_local_materials: boolean,
    allows_local_food_experience: boolean,
    is_active: boolean
    provience?: number
}

export interface Item {
  id?: number;
  name?: string;
  value?: string;
  label?: string;
}

export interface TAccommodationResponse{
  isSuccess: boolean;
}