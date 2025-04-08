
export type Genre = {
  id: number;
  name: string;
};

export type Actor = {
  cast_id: number;
  name: string;
  character: string;
  profile_path: string;
};

export type film = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  tagline: string;
  origin_country: string[];
  release_date: string;
  budget: number;
  runtime: number;
  genres: Genre[];
  credits: {
    cast: Actor[];
  };
};