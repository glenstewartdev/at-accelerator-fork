import { NgModule } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FavoritesViewComponent } from './favorites-view/favorites-view.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FavoritesViewComponent,
    SearchPageComponent,
  ],
  providers: [
    provideHttpClient(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
