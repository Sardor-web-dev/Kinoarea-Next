export type MediaItem = {
  id: number;
  media_type: "movie" | "tv";
  title?: string;
  name?: string;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string; 
  genre_ids?: number[];
  character?: string;
  job?: string;
  popularity?: number;
};
