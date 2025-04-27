import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FusionChartComponent } from './fusion-chart.component';

describe('FusionChartComponent', () => {
  let component: FusionChartComponent;
  let fixture: ComponentFixture<FusionChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FusionChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FusionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
