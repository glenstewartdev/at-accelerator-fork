import { Directive, HostListener, inject, Input } from '@angular/core';
import { TvShow } from '../services/tv-shows/tv-show.model';
import { FavoriteShowsService } from '../services/favorite-shows/favorite-shows.service';

@Directive({
  selector: '[appToggleFavorite]',
  standalone: true
})
export class ToggleFavoriteDirective {
  @Input() show!: TvShow;

  private favoritesService = inject(FavoriteShowsService);

  @HostListener('click')
  toggleFavorite(): void {
    if(this.favoritesService.isFavorite(this.show.id)) {
      this.favoritesService.removeFavorite(this.show)
    } else {
    this.favoritesService.addToFavorites(this.show);
    }
  }

}
