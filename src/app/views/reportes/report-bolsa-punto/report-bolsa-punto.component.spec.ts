import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportBolsaPuntoComponent } from './report-bolsa-punto.component';

describe('ReportBolsaPuntoComponent', () => {
  let component: ReportBolsaPuntoComponent;
  let fixture: ComponentFixture<ReportBolsaPuntoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportBolsaPuntoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportBolsaPuntoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
