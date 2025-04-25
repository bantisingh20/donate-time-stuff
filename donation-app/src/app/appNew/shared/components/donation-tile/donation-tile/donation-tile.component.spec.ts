import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationTileComponent } from './donation-tile.component';

describe('DonationTileComponent', () => {
  let component: DonationTileComponent;
  let fixture: ComponentFixture<DonationTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationTileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
