import { inject, Injectable } from '@angular/core';
import { TvShowDetail } from '../tv-shows/tv-show.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TvShowDetailService implements Resolve<Observable<TvShowDetail>> {
  private readonly TVSHOW_BASE_URL = 'https:/www.episodate.com';
  private readonly TVSHOW_DETAIL = '/api/show-details';

  private http = inject(HttpClient);

  fetchTvShowDetails(ShowId: number): Observable<TvShowDetail> {
    let url = `${this.TVSHOW_BASE_URL}${this.TVSHOW_DETAIL}`;
    let returnValue: Observable<TvShowDetail>;

    if(ShowId) {
      url = `${url}?q=${ShowId}`;
      returnValue = this.http.get<TvShowDetail>(url);
    } else {
      // Initialize returnValue to avoid returning undefined
      returnValue = new Observable<TvShowDetail>(observer => {
        observer.error('TvShowDetailService.fetchTvShowDetails: ShowId is required');
      });
    }
    return returnValue;
  }

  resolve(route: ActivatedRouteSnapshot): Observable<TvShowDetail> {
    const id = route.paramMap.get('id');
    return this.fetchTvShowDetails(Number(id));
  }
}
