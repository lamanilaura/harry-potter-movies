import { Movie } from "./movie.model";

export interface MovieDetails extends Movie {
  box_office: string;
  cinematographers: string[];
  poster: string;
  producers: string[];
  summary: string;
}