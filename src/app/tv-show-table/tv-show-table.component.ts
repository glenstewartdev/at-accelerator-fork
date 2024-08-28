import { Component, computed, EventEmitter, inject, input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvShow, TvShowPage } from '../services/tv-shows/tv-show.model';
import { FavoriteShowsService } from '../services/favorite-shows/favorite-shows.service';

@Component({
  selector: 'app-tv-show-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tv-show-table.component.html',
  styleUrls: ['./tv-show-table.component.css']
})
export class TvShowTableComponent {

  protected favoritesService = inject(FavoriteShowsService);

  tvShowsPage = input.required<TvShowPage>();
  @Output() nextClicked = new EventEmitter<string>();

  tvShows = computed( () => {
    return this.tvShowsPage()?.tv_shows;
  })

  onNext(event: Event): void {
    event.preventDefault();
    this.nextClicked.emit();   
  }

  toggleFavorite(show: TvShow): void {
    if(this.favoritesService.isFavorite(show.id)) {
      this.favoritesService.removeFavorite(show)
    } else {
    this.favoritesService.addToFavorites(show);
    }
  }

}
