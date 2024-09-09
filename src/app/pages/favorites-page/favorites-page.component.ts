import { Component, inject, signal } from '@angular/core';
import { FavoritesViewComponent } from 'src/app/favorites-view/favorites-view.component';
import { FavoriteShowsService } from 'src/app/services/favorite-shows/favorite-shows.service';
import { TvShowPage } from 'src/app/services/tv-shows/tv-show.model';
import { TvShowTableComponent } from 'src/app/tv-show-table/tv-show-table.component';


@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [FavoritesViewComponent, TvShowTableComponent],
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.css'
})
export class FavoritesPageComponent {
  favoriteShowsService = inject(FavoriteShowsService);
  favorateShowsPage = signal<TvShowPage>(this.favoriteShowsService.favoritesPage());
  favoriteDetailslist = this.favoriteShowsService.getAllFavoritesDetail();

  handleNextClick(): void {
    this.favoriteShowsService.nextPage(this.favorateShowsPage().page);
  }
}
