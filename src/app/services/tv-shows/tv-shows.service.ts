import { Injectable, Signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WritableSignal, signal } from '@angular/core';
import { TvShow, TvShowPage } from './tv-show.model';

@Injectable({
  providedIn: 'root'
})
export class TvShowsService {

  private http = inject(HttpClient);
  private tvSearchUrl = 'https://www.episodate.com/api/search';
  private tvShowsPageSignal: WritableSignal<TvShowPage> = signal({
    total: 0,
    page: 0,
    pages: 0,
    tv_shows: []
  });
  private tvShows = signal<TvShow[]>([]);

  public tvShowsPage = this.tvShowsPageSignal.asReadonly();

  fetchTvShows(): Signal<TvShowPage> {
    this.http.get<TvShowPage>(`${this.tvSearchUrl}`)
      .subscribe(response => {
        this.tvShowsPageSignal.set(response);
        this.tvShows.set(response.tv_shows);
      });
    return this.tvShowsPage;
  }

  fetchTvShowByName(searchValue: string): void {
    let url = `${this.tvSearchUrl}`;

    if( searchValue.length !== 0 ) {
      url = `${url}?q=${searchValue}&page=1`;
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
    let url = `${this.tvSearchUrl}`;

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
