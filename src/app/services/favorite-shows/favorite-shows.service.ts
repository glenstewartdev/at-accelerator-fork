import { computed, inject, Injectable, signal } from '@angular/core';
import { TvShow, TvShowDetail, TvShowPage } from '../tv-shows/tv-show.model';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { TvShowDetailService } from '../tv-show-detail/tv-show-detail.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteShowsService {

  private tvShowDetailService = inject(TvShowDetailService);

  private localStorageService = inject(LocalStorageService)
  private favoriteShows = signal<TvShow[]>(
    this.localStorageService.getItem<TvShow[]>('showFavorites') || []
  );
  totalFavorites = this.favoriteShows().length;
  page = 1;
  itemsPerPage = 10;

  /*
  export interface TvShowPage {
  total: number;
  page: number;
  pages: number;
  tv_shows: TvShow[];
}*/
  
  public favoritesPage = computed( () => {
    let page: TvShowPage = {
      total: this.favoriteShows().length,
      page: this.page,
      pages: Math.ceil(this.totalFavorites / this.itemsPerPage),
      tv_shows: this.favoriteShows()
    }
    return page;
  });

  public favoritesDetails = signal<TvShowDetail[]>([]);

  constructor() { }

  getAllFavoritesDetail () {
    if(this.favoritesDetails().length === 0) {
      this.tvShowDetailService.fetchAllTvShowDetails(this.favoriteShows())
      .subscribe( (response) => {
        this.favoritesDetails.set(response);
      });
    }
    return this.favoritesDetails;
  }

  addToFavorites(newFavorite: TvShow): void {
    if (newFavorite) {
      this.favoriteShows().push(newFavorite);
      this.localStorageService.setItem('showFavorites', this.favoriteShows());
    }
  }

  removeFavorite(favoriteToRemove: TvShow): void {
    if(favoriteToRemove){
      const index = this.favoriteShows().findIndex(show => show.id === favoriteToRemove.id);

      if (index !== -1) {
        this.favoriteShows().splice(index, 1);
        this.localStorageService.setItem('showFavorites', this.favoriteShows());
      }
    }
  }

  isFavorite(showId: number): boolean {
    const exists = this.favoriteShows().some(show => show.id === showId);
    return exists;
  }

  nextPage(page: number): void {
    this.page++;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.favoriteShows.set(this.favoriteShows().slice(startIndex, endIndex));
  }
}
