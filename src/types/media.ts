export type MediaItem = {
  id: number;
  media_type: "movie" | "tv";
  title?: string;
  name?: string;
  poster_path: string | null;
  character?: string;
  job?: string;
  popularity?: number;
}
