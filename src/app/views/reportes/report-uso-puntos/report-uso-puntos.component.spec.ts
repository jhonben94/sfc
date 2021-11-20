import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportUsoPuntosComponent } from './report-uso-puntos.component';

describe('ReportUsoPuntosComponent', () => {
  let component: ReportUsoPuntosComponent;
  let fixture: ComponentFixture<ReportUsoPuntosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportUsoPuntosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportUsoPuntosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
