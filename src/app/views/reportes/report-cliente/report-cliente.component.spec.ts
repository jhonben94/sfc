import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportClienteComponent } from './report-cliente.component';

describe('ReportClienteComponent', () => {
  let component: ReportClienteComponent;
  let fixture: ComponentFixture<ReportClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
