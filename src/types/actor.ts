import { MediaItem } from "./media";

export interface Person {
  id: number;
  name: string;
  birthday: string;
  biography: string;
  profile_path: string | null;
  place_of_birth: string;
  combined_credits: {
    cast: MediaItem[];
    crew: MediaItem[];
  };
}
