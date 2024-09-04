import { Component, Input } from '@angular/core';
import { TvShowDetail } from 'src/app/services/tv-shows/tv-show.model';
import {DatePipe, DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-tv-show-detail-view',
  standalone: true,
  imports: [DatePipe, DecimalPipe],
  templateUrl: './tv-show-detail-view.component.html',
  styleUrl: './tv-show-detail-view.component.css'
})
export class TvShowDetailViewComponent {

  @Input() tvShowDetail!: TvShowDetail;

  public back() {
    history.back();
  }
}
