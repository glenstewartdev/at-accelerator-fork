import { Component, OnInit, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvShow } from '../services/tv-shows/tv-show.model';

@Component({
  selector: 'app-tv-show-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tv-show-table.component.html',
  styleUrls: ['./tv-show-table.component.css']
})
export class TvShowTableComponent implements OnInit {

  tvShows = input<TvShow[]>();

  public ngOnInit(): void {
  }

}
