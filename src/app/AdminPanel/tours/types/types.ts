export type TtourItems = {
    id: number;
  title: string;
  category: string;description: string;vehicle_type: string;duration_days: number;difficulty:string;
}

// export type TCreateTour = {
//   title: string;
//   slug: string; 
//   category: "incountry" | "foreign"; 
//   description: string; 
//   short_description: string;
//   vehicle_type: "bus" | "train" | "flight" | "ship" | "car" | "other"; 
//   vehicle_details: string;
//   transportation_included: boolean; 
//   featured_image: string; 
//   price: number; 
//   original_price: number; 
//   duration_days: number;
//   duration_nights: number; 
//   start: string; 
//   end: string; 
//   destination: string; 
//   country: string; 
//   meeting_point: string; 
//   meeting_point_latitude: number;
//   meeting_point_longitude: number;
//   max_participants: number; 
//   min_participants: number; 
//   difficulty: "easy" | "moderate" | "challenging" | "difficult"; 
//   age_requirement: number; 
//   included: string;
//   excluded: string; 
//   highlights: string;
//   status: "draft" | "active" | "archived"; 
//   is_featured: boolean;
//   meta_title: string;
//   meta_description: string;
//   average_rating: number;
//   total_reviews: number;
// };


export type TtourResponse = {
    id: number,
    title: string,
    category: string,
    vehicle_type: string,
    start: string,
    end: string,
    country: string,
    meeting_point: string,
    max_participants: 2147483647,
    price: string,
    status: string,
    created_at: string
}