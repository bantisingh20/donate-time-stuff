import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationCategoryComponent } from './donation-category.component';

describe('DonationCategoryComponent', () => {
  let component: DonationCategoryComponent;
  let fixture: ComponentFixture<DonationCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
