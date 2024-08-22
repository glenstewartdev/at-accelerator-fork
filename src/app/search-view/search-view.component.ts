import { Component, EventEmitter, OnInit, Output, computed, inject, input } from '@angular/core';
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
export class SearchViewComponent {

  searchTerm = input<string>('');
  @Output() searchTermChange = new EventEmitter<string>();

  protected tvShowService = inject(TvShowsService);

  public tvShowsPage = computed( () => {
    return this.tvShowService.tvShowsPage();
  });

  onSearch(event: Event, searchTerm: string) {
    event.preventDefault();
    this.searchTermChange.emit(searchTerm);
  }

}
