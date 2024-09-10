import { computed, inject, Injectable, signal } from '@angular/core';
import { TvShow, TvShowDetail, TvShowEpisode } from '../tv-shows/tv-show.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { forkJoin, map, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TvShowDetailService implements Resolve<Observable<TvShowDetail>> {
  private readonly TVSHOW_BASE_URL = 'https:/www.episodate.com';
  private readonly TVSHOW_DETAIL = '/api/show-details';

  private http = inject(HttpClient);

  episodes = signal<TvShowEpisode[]>([]);

  seasonCount = computed( () => {
    const seasons = new Set<number>();
    this.episodes().forEach(episode => seasons.add(episode.season));
    return seasons.size;
  });

  fetchTvShowDetails(ShowId: number): Observable<TvShowDetail> {
    
    let url = `${this.TVSHOW_BASE_URL}${this.TVSHOW_DETAIL}`;
    let returnValue$: Observable<TvShowDetail>;

    if(ShowId) {
      url = `${url}?q=${ShowId}`;
      returnValue$ = this.http.get<{tvShow: TvShowDetail}>(url)
        .pipe(
          map(data => data.tvShow),
          tap(tvShow => {
            this.episodes.set(tvShow.episodes);
          })
        );
    } else {
      returnValue$ = throwError(() => new Error('TvShowDetailService.fetchTvShowDetails: showId is required'));
    }
    return returnValue$;
  }

  fetchAllTvShowDetails(tvShows: TvShow[]): Observable<TvShowDetail[]> {
    const detailObservables = tvShows.map(show => this.fetchTvShowDetails(show.id));
    return forkJoin(detailObservables)
    .pipe(
      map(this.sortDetailsByNextEpisodeDate)
    );
  }

  resolve(route: ActivatedRouteSnapshot): Observable<TvShowDetail> {
    const id = route.paramMap.get('id');
    let tvShowDetail$ = this.fetchTvShowDetails(Number(id));
    return tvShowDetail$;
  }

  private sortDetailsByNextEpisodeDate(tvShowDetails: TvShowDetail[]): TvShowDetail[] {
    tvShowDetails.sort((show1, show2) => {
      if (show1.status === "Running" && show2.status !== "Running") {
        return -1;
      }
      if (show1.status === "Ended" || show1.status === "Canceled/Ended") {
        return 1;
      }
      if (show1.countdown && !show2.countdown) {
        return -1;
      }
      if (show1.countdown && show2.countdown && show1.countdown?.air_date < show2.countdown?.air_date) {
        return -1;
      }
      return 0;
    });
    return tvShowDetails;
  }
}
