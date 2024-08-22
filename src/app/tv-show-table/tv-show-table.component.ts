import { Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvShowPage, TvShowPageState } from '../services/tv-shows/tv-show.model';
import { TvShowsService } from '../services/tv-shows/tv-shows.service';

@Component({
  selector: 'app-tv-show-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tv-show-table.component.html',
  styleUrls: ['./tv-show-table.component.css']
})
export class TvShowTableComponent {

  tvShowFilter = input.required<string>();
  tvShowsPage = input.required<TvShowPage>();

  tvShowService = inject(TvShowsService);

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

  onNext(event: Event): void {
    event.preventDefault();
    const currentPage = this.tvShowsPageState()?.currentPage ?? 0;
    const page = currentPage + 1;

    this.tvShowService.fetchNextPage(this.tvShowFilter(), page);    
  }

}
