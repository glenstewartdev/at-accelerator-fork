import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Signal, signal } from '@angular/core';
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
  
  public ngOnInit(): void {
    this.tvShowsPage = this.tvShowService.fetchTvShows();
  }

  handleSearchTermChange(searchTerm: string): void {
    this.tvShowService.fetchTvShowByName(searchTerm);
  }

  handleNextClick(): void {
    const nextPage = this.tvShowsPage().page + 1;
    this.tvShowService.fetchPage(this.searchTerm(), nextPage);
  }
}

