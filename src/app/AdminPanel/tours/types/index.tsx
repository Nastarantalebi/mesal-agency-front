import type { TOption } from "@/types";

export type TtourTemplateItems = {
  id: number;
  title: string;
  category: { label: string; value: string };
  vehicle_type: { label: string; value: string };
  difficulty: { label: string; value: string };
  country: string;
  short_description: string;
  destination: string;
  age_requirement: number;
  images: [
    { id: 0; image: string; caption: string; main: true; order: number },
  ];
};

export type TtourTemplateResponse = {
  id: number;
  title: string;
  slug: string;
  category: TOption;
  description: string;
  short_description: string;
  vehicle_type: TOption;
  vehicle_details: string;
  transportation_included: boolean;
  destination: string;
  country: string;
  difficulty: TOption;
  age_requirement: number;
  highlights: string;
  is_featured: boolean;
  meta_title: string;
  meta_description: string;
  average_rating: string;
  total_reviews: string;
  created_at: string;
  updated_at: string;
};

//----------------------------------------------

export type TCreateDeparturePlan = {
  date: string;
  breakfast: boolean;
  dinner: boolean;
  lunch: boolean;
  description: string;
};


//------------------------------------------

export type TourDepartureItem = {
  id: number;
  start: string;
  end: string;
  duration_days: number;
  available_seats: number;
};
export type TdepartureResponse = {
  id: number;
  start: string;
  end: string;
  duration_days: number;
  duration_nights: number;
  price: string;
  original_price: string;
  max_participants: number;
  min_participants: number;
  available_seats: number;
  meeting_point: string;
  status: TOption;
  is_featured: true;
  created_at: string;
  tour: {
    id: number;
    title: string;
    category: TOption;
    short_description: string;
    destination: string;
    country: string;
    difficulty: TOption;
  };
};
