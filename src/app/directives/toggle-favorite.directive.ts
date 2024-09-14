import { Directive, HostBinding, HostListener, inject, Input } from '@angular/core';
import { FavoriteShowsService } from '../services/favorite-shows/favorite-shows.service';

@Directive({
  selector: '[appToggleFavorite]',
  standalone: true
})
export class ToggleFavoriteDirective {
  @Input() showId!: number;

  private favoritesService = inject(FavoriteShowsService);
  @HostBinding('class.highlight')
  get highlight() {
    return this.favoritesService.isFavorite(this.showId)
  } 

  @HostListener('click')
  toggleFavorite(): void {
    if(this.favoritesService.isFavorite(this.showId)) {
      this.favoritesService.removeFavoriteById(this.showId);
    } else {
    this.favoritesService.addToFavoritesById(this.showId);
    }
  }
}
