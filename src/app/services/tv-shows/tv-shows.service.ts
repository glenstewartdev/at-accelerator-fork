import { Injectable, Signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WritableSignal, signal } from '@angular/core';
import { TvShow, TvShowPage } from './tv-show.model';

@Injectable({
  providedIn: 'root'
})
export class TvShowsService {
  private readonly TVSHOW_BASE_URL = 'https:/www.episodate.com';
  private readonly TVSHOW_SEARCH = '/api/search';
  
  private http = inject(HttpClient);
  private tvShowsPageSignal: WritableSignal<TvShowPage> = signal({
    total: 0,
    page: 0,
    pages: 0,
    tv_shows: []
  });

  public tvShowsPage = this.tvShowsPageSignal.asReadonly();
  public tvShows = computed( () => {
    return this.tvShowsPage().tv_shows;
  });

  getTvShowById(showId: number): TvShow | undefined {
    console.log('TvShows list is: ', this.tvShows());
    const tvShow = this.tvShows().find( show => show.id === showId);
    return tvShow;
  }

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
}
