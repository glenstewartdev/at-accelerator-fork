import { TestBed } from '@angular/core/testing';

import { FavoriteShowsService } from './favorite-shows.service';

describe('FavoriteShowsService', () => {
  let service: FavoriteShowsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteShowsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
