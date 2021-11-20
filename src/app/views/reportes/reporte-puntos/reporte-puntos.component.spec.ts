import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportePuntosComponent } from './reporte-puntos.component';

describe('ReportePuntosComponent', () => {
  let component: ReportePuntosComponent;
  let fixture: ComponentFixture<ReportePuntosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportePuntosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportePuntosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
