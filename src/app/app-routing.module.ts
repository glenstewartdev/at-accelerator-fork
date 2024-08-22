import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FavoritesViewComponent} from "./favorites-view/favorites-view.component";
import { SearchPageComponent } from './pages/search-page/search-page.component';

const routes: Routes = [
  {path: "", component: SearchPageComponent},
  {path: "search", component: SearchPageComponent},
  {path: "favorites", component: FavoritesViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
