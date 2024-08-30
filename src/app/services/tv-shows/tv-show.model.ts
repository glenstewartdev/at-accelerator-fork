export interface TvShow {
  id: number;
  name: string;
  permalink: string;
  start_date: string;
  end_data: string | null;
  country: string;
  network: string;
  status: string;
  image_thumbnail_path: string;
}

export type TvShowGenre = "Drama" | "Action" | "Science Fiction";

export interface TvShowEpisode {
  season: number;
  episode: number;
  name: string;
  air_date: string;
}

export interface TvShowPage {
  total: number;
  page: number;
  pages: number;
  tv_shows: TvShow[];
}

export interface TvShowPageState {
  totalPages: number;
  currentPage: number;
}

export interface TvShowDetail {
  id: number;
  name: string;
  permalink: string;
  url: string;
  description: string;
  description_source: string;
  start_date: string;
  end_data: string | null;
  country: string;
  status: string;
  runtime: number;
  network: string;
  youtube_link: string | null;
  image_path: string;
  image_thumbnail_path: string;
  rating: number;
  rating_count: number;
  countdown: string | null; // ?
  genres: TvShowGenre[];
  pictures: string[];
  episodes: TvShowEpisode[];
}