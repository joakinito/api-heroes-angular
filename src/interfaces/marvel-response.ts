import { Hero } from "./hero";

export interface MarvelResponse {
    code: number;
    data: {
      results: Hero[]; 
    };
    status: string;
  }