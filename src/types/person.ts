export type Person = {
  id: number;
  name: string;
  profile_path: string | null;
  known_for: { title?: string; name?: string; media_type: string }[];
};
