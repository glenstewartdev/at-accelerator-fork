import { Injectable, Signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WritableSignal, signal } from '@angular/core';
import { TvShow, TvShowDetail, TvShowPage } from './tv-show.model';

@Injectable({
  providedIn: 'root'
})
export class TvShowsService {
  private readonly TVSHOW_BASE_URL = 'https:/www.episodate.com';
  private readonly TVSHOW_SEARCH = '/api/search';
  private readonly TVSHOW_DETAIL = '/api/show-details';

  private http = inject(HttpClient);
  private tvShowsPageSignal: WritableSignal<TvShowPage> = signal({
    total: 0,
    page: 0,
    pages: 0,
    tv_shows: []
  });

  private tvShowsDetailSignal: WritableSignal<TvShowDetail> = signal({
    id: 0,
    name: '',
    permalink: '',
    url: '',
    description: '',
    description_source: '',
    start_date: '',
    end_data: null,
    country: '',
    status: '',
    runtime: 0,
    network: '',
    youtube_link: null,
    image_path: '',
    image_thumbnail_path: '',
    rating: 0,
    rating_count: 0,
    countdown: null,
    genres: [],
    pictures: [],
    episodes: []
  });

  public tvShowsPage = this.tvShowsPageSignal.asReadonly();
  public tvShowDetail = this.tvShowsDetailSignal.asReadonly();

  fetchTvShows(): Signal<TvShowPage> {
    let url = `${this.TVSHOW_BASE_URL}${this.TVSHOW_SEARCH}`;
    this.http.get<TvShowPage>(url)
      .subscribe(response => {
        this.tvShowsPageSignal.set(response);
      });
    return this.tvShowsPage;
  }

  fetchTvShowByName(showName: string): void {
    let url = `${this.TVSHOW_BASE_URL}${this.TVSHOW_SEARCH}`;

    if( showName.length !== 0 ) {
      url = `${url}?q=${showName}&page=1`;
    }

    this.http.get<TvShowPage>(url)
      .subscribe(response => {
        this.tvShowsPageSignal.set(response);
      });    
  }

  fetchPage(
    tvShowFilter: string | undefined,
    page: number
  ): void {
    let url = `${this.TVSHOW_BASE_URL}${this.TVSHOW_SEARCH}`;

    if( tvShowFilter?.length !== 0 ) {
      url = `${url}?q=${tvShowFilter}&page=${page}`;
    } else {
      url = `${url}?page=${page}`;
    }

    this.http.get<TvShowPage>(url)
      .subscribe(response => {
        this.tvShowsPageSignal.set(response);
      }); 
  }

  fetchTvShowDetails(ShowId: number): void {
    let url = `${this.TVSHOW_BASE_URL}${this.TVSHOW_DETAIL}`;
    if(ShowId) {
      url = `${url}?q=${ShowId}`;
      this.http.get<TvShowDetail>(url)
      .subscribe(response => {
        this.tvShowsDetailSignal.set(response);
      });
    }
    console.log('Show detail is: ', this.tvShowDetail());
  }

}
