import { Component, inject, Input } from '@angular/core';
import { TvShowDetail } from 'src/app/services/tv-shows/tv-show.model';
import {CommonModule, DatePipe, DecimalPipe} from '@angular/common';
import { TvShowDetailService } from 'src/app/services/tv-show-detail/tv-show-detail.service';

@Component({
  selector: 'app-tv-show-detail-view',
  standalone: true,
  imports: [CommonModule, DatePipe, DecimalPipe],
  templateUrl: './tv-show-detail-view.component.html',
  styleUrl: './tv-show-detail-view.component.css'
})
export class TvShowDetailViewComponent {

  @Input() tvShowDetail!: TvShowDetail;

  protected tvShowDetailService = inject(TvShowDetailService);

  public back() {
    history.back();
  }
}
