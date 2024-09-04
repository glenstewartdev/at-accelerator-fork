import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvShowDetailViewComponent } from './tv-show-detail-view.component';

describe('TvShowDetailViewComponent', () => {
  let component: TvShowDetailViewComponent;
  let fixture: ComponentFixture<TvShowDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvShowDetailViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvShowDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
