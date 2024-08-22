import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, Signal, signal } from '@angular/core';
import { SearchViewComponent } from 'src/app/search-view/search-view.component';
import { TvShowPage } from 'src/app/services/tv-shows/tv-show.model';
import { TvShowsService } from 'src/app/services/tv-shows/tv-shows.service';
import { TvShowTableComponent } from 'src/app/tv-show-table/tv-show-table.component';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, SearchViewComponent, TvShowTableComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent implements OnInit {

  private tvShowService = inject(TvShowsService);

  protected searchTerm = signal<string>('');
  protected tvShowsPage!: Signal<TvShowPage>;
  protected tvShows = computed( () => {
    return this.tvShowsPage().tv_shows;
  }); 
  
  public ngOnInit(): void {
    this.tvShowsPage = this.tvShowService.fetchTvShows();
  }

  handleSearchTermChange(searchTerm: string) {
    this.tvShowService.fetchTvShowByName(searchTerm);
  }
}

