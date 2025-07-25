import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleChartsComponent } from './google-charts.component';

describe('GoogleChartsComponent', () => {
  let component: GoogleChartsComponent;
  let fixture: ComponentFixture<GoogleChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleChartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
