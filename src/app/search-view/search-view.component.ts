import { Component, OnInit, WritableSignal, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TvShowTableComponent} from '../tv-show-table/tv-show-table.component';
import { TvShowsService } from './../services/tv-shows/tv-shows.service';

@Component({
  selector: 'app-search-view',
  standalone: true,
  imports: [CommonModule, TvShowTableComponent],
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css']
})
export class SearchViewComponent implements OnInit {

  tvShowService = inject(TvShowsService);

  public tvShowsPage = computed( () => {
    return this.tvShowService.tvShowsPage();
  });

  public tvShowFilter = signal('');

  public ngOnInit(): void {
    this.tvShowService.fetchTvShows();
  }

  onSearch(event: Event) {
    event.preventDefault();
    const searchValue = this.tvShowFilter();
    this.tvShowService.fetchTvShowByName(searchValue);
  }

}
