import { Component, computed, input } from '@angular/core';
import { TvShowTableComponent } from '../tv-show-table/tv-show-table.component';
import { FavoritesCardComponent } from '../views/favorites-card/favorites-card.component';
import { TvShowDetail, TvShowPage } from '../services/tv-shows/tv-show.model';

@Component({
  selector: 'app-favorites-view',
  imports: [ TvShowTableComponent, FavoritesCardComponent ],
  standalone: true,
  templateUrl: './favorites-view.component.html',
  styleUrls: ['./favorites-view.component.css']
})
export class FavoritesViewComponent {

  tvShowsPage = input.required<TvShowPage>();
  favoritesDetailList = input.required<TvShowDetail[]>();

  sampleDetail = computed( () => {
    const detail = this.tvShowsPage().tv_shows[0];
    return detail;
  });
  
}
