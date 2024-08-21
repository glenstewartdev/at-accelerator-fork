import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvShowPage, TvShowPageState } from '../services/tv-shows/tv-show.model';

@Component({
  selector: 'app-tv-show-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tv-show-table.component.html',
  styleUrls: ['./tv-show-table.component.css']
})
export class TvShowTableComponent {

  tvShowsPage = input<TvShowPage>();

  tvShows = computed( () => {
    return this.tvShowsPage()?.tv_shows;
  })

  tvShowsPageState = computed( () => {
    let state: TvShowPageState = {
      totalPages: this.tvShowsPage()?.pages,
      currentPage: this.tvShowsPage()?.page
    }
    return state;
  })

}
