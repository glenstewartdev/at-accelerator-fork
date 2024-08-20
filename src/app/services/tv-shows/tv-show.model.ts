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

export interface TvShowPage {
  total: number;
  page: number;
  pages: number;
  tv_shows: TvShow[];
}