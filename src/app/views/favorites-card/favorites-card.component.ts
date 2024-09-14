import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TvShowDetail } from 'src/app/services/tv-shows/tv-show.model';
import { CountdownPipe } from "../../pipes/countdown.pipe";
import { ToggleFavoriteDirective } from '../../directives/toggle-favorite.directive';

@Component({
  selector: 'app-favorites-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    CountdownPipe,
    ToggleFavoriteDirective
  ],
  templateUrl: './favorites-card.component.html',
  styleUrl: './favorites-card.component.css'
})
export class FavoritesCardComponent {

  public tvShowDetail = input.required<TvShowDetail>();
}
