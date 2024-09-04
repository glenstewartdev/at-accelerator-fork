import { inject, Injectable } from '@angular/core';
import { TvShowDetail } from '../tv-shows/tv-show.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TvShowDetailService implements Resolve<Observable<TvShowDetail>> {
  private readonly TVSHOW_BASE_URL = 'https:/www.episodate.com';
  private readonly TVSHOW_DETAIL = '/api/show-details';

  private http = inject(HttpClient);

  fetchTvShowDetails(ShowId: number): Observable<TvShowDetail> {
    
    let url = `${this.TVSHOW_BASE_URL}${this.TVSHOW_DETAIL}`;
    let returnValue$: Observable<TvShowDetail>;

    if(ShowId) {
      url = `${url}?q=${ShowId}`;
      returnValue$ = this.http.get<{tvShow: TvShowDetail}>(url)
        .pipe(
          map(data => data.tvShow)
        );
    } else {
      returnValue$ = throwError(() => new Error('TvShowDetailService.fetchTvShowDetails: showId is required'));
    }
    return returnValue$;
  }

  resolve(route: ActivatedRouteSnapshot): Observable<TvShowDetail> {
    const id = route.paramMap.get('id');
    let tvShowDetail$ = this.fetchTvShowDetails(Number(id));
    return tvShowDetail$;
  }
}
