import { Injectable, Signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WritableSignal, signal } from '@angular/core';
import { TvShow, TvShowPage } from './tv-show.model';
import { Observable } from 'rxjs';

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

  get tvShowsPage(): Signal<TvShowPage> {
    return this.tvShowsPageSignal.asReadonly();
  }

  fetchTvShows(): void {
    this.http.get<TvShowPage>(`${this.tvSearchUrl}`)
      .subscribe(response => {
        this.tvShowsPageSignal.set(response);
      });
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

}
