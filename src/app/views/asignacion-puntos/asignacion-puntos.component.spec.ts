import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionPuntosComponent } from './asignacion-puntos.component';

describe('AsignacionPuntosComponent', () => {
  let component: AsignacionPuntosComponent;
  let fixture: ComponentFixture<AsignacionPuntosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignacionPuntosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacionPuntosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
