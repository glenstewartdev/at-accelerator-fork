import { Component } from '@angular/core';
import { TvShowTableComponent } from '../tv-show-table/tv-show-table.component';

@Component({
  selector: 'app-favorites-view',
  imports: [ TvShowTableComponent ],
  standalone: true,
  templateUrl: './favorites-view.component.html',
  styleUrls: ['./favorites-view.component.css']
})
export class FavoritesViewComponent {

}
