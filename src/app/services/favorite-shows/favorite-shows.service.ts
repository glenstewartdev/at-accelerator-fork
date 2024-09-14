import { computed, inject, Injectable, signal } from '@angular/core';
import { TvShow, TvShowDetail, TvShowPage } from '../tv-shows/tv-show.model';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { TvShowDetailService } from '../tv-show-detail/tv-show-detail.service';
import { TvShowsService } from '../tv-shows/tv-shows.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteShowsService {

  private tvShowDetailService = inject(TvShowDetailService);
  private tvShowService = inject(TvShowsService);
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

  addToFavoritesById(newFavoriteId: number): void {
    const newFavoriteShow = this.tvShowService.getTvShowById(newFavoriteId);
    if (newFavoriteShow) {
      this.addToFavorites(newFavoriteShow);
    }
  }

  addToFavorites(newFavorite: TvShow): void {
    if (newFavorite) {
      const currentFavorites = this.favoriteShows();
      // don't do it this way
      // the signal will not be notified of the change
      //this.favoriteShows().push(newFavorite);

      // by using the signal's setter, the signal change is seen
      this.favoriteShows.set([...currentFavorites, newFavorite]);
      this.addMissingDetails();
      this.localStorageService.setItem('showFavorites', this.favoriteShows());
    }
  }

  removeFavoriteById(favoriteToRemoveId: number): void {
    const favoriteToRemove = this.favoriteShows().find(show => show.id === favoriteToRemoveId);
    if(favoriteToRemove) {
      this.removeFavorite(favoriteToRemove);
    }
  }

  removeFavorite(favoriteToRemove: TvShow): void {
    if (favoriteToRemove) {
      const currentFavorites = this.favoriteShows();
      const updatedFavorites = currentFavorites.filter(show => show.id !== favoriteToRemove.id);
  
      this.favoriteShows.set(updatedFavorites);
      this.removeExtraDetails();
      this.localStorageService.setItem('showFavorites', updatedFavorites);
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

  private refreshFavoriteDetails(): void {
    if(this.favoritesDetails().length !== 0) {
      this.addMissingDetails();
      this.removeExtraDetails();
    }
  }

  private addMissingDetails(): void {
    const favoriteShows = this.favoriteShows();
    const favoritesDetail = this.favoritesDetails();

      // Find shows in favoriteShows that are not in favoritesDetail
    const missingShows = favoriteShows.filter(show => 
    !favoritesDetail.some(detail => detail.id === show.id)
    );

    if (missingShows.length > 0) {
      this.tvShowDetailService.fetchAllTvShowDetails(missingShows)
      .subscribe( (response) => {
        this.favoritesDetails.set([...favoritesDetail, ...response]);
      });
    }
  }

  private removeExtraDetails() : void {
    const favoriteShows = this.favoriteShows();
    const favoritesDetail = this.favoritesDetails();

    const extraShows = favoritesDetail.filter(show => 
      !favoriteShows.some(detail => detail.id === show.id)
      );

      if (extraShows.length > 0) {
        const updatedFavoritesDetails = favoritesDetail.filter(detail =>
          !extraShows.some(show => show.id === detail.id));
    
        this.favoritesDetails.set(updatedFavoritesDetails);
      }
  }
}
