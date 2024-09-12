import { Component, computed, EventEmitter, inject, input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvShowPage } from '../services/tv-shows/tv-show.model';
import { FavoriteShowsService } from '../services/favorite-shows/favorite-shows.service';
import { Router } from '@angular/router';
import { ToggleFavoriteDirective } from '../directives/toggle-favorite.directive';

@Component({
  selector: 'app-tv-show-table',
  standalone: true,
  imports: [CommonModule, ToggleFavoriteDirective],
  templateUrl: './tv-show-table.component.html',
  styleUrls: ['./tv-show-table.component.css']
})
export class TvShowTableComponent {

  // TODO:
  // remove this and instead emit an event to the parent
  private router = inject(Router);

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

  navigateToShowDetail(id: number): void {
    this.router.navigate(['show-details', id]);
  }

}
