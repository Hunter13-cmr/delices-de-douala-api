export interface Restaurant {
  id: number;
  name: string;
  district: string;
  specialty: string;
  image: string;
  headerImage?: string;
  currentRating?: number;
}
