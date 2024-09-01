import { TestBed } from '@angular/core/testing';

import { TvShowDetailService } from './tv-show-detail.service';

describe('TvShowDetailService', () => {
  let service: TvShowDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TvShowDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
