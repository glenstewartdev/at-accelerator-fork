import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesCardComponent } from './favorites-card.component';

describe('FavoritesCardComponent', () => {
  let component: FavoritesCardComponent;
  let fixture: ComponentFixture<FavoritesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
