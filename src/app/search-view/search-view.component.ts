import { Component, OnInit, WritableSignal, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TvShowTableComponent} from '../tv-show-table/tv-show-table.component';
import { TvShowsService } from './../services/tv-shows/tv-shows.service';
import { TvShow, TvShowPage } from '../services/tv-shows/tv-show.model';

@Component({
  selector: 'app-search-view',
  standalone: true,
  imports: [CommonModule, TvShowTableComponent],
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css']
})
export class SearchViewComponent implements OnInit {

  tvShowService = inject(TvShowsService);
  public tvShows = computed(() => {
    return this.tvShowService.tvShowsPage().tv_shows
  });

  public tvShowSearch = signal('');

  public ngOnInit(): void {
    this.tvShowService.fetchTvShows();
  }

  onSearch(event: Event) {
    event.preventDefault();
    const searchValue = this.tvShowSearch();
    console.log('onSearch, searchValue is: ', searchValue);
    this.tvShowService.fetchTvShowByName(searchValue);
  }

}
