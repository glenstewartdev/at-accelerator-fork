import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { TvShowDetailService } from './services/tv-show-detail/tv-show-detail.service';
import { TvShowDetailViewComponent } from './views/tv-show-detail-view/tv-show-detail-view.component';

const routes: Routes = [
  {path: "", component: SearchPageComponent},
  {path: "search", component: SearchPageComponent},
  {path: "favorites", component: FavoritesPageComponent},
  {
    path: "show-details/:id",
    loadComponent: () => import('./views/tv-show-detail-view/tv-show-detail-view.component')
      .then(mod => mod.TvShowDetailViewComponent),
    resolve: {
      tvShowDetail: TvShowDetailService
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {bindToComponentInputs: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
