import { Component } from '@angular/core';
import { FavoritesViewComponent } from 'src/app/favorites-view/favorites-view.component';


@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [FavoritesViewComponent],
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.css'
})
export class FavoritesPageComponent {

}
