import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionPuntosEditComponent } from './asignacion-puntos-edit.component';

describe('AsignacionPuntosEditComponent', () => {
  let component: AsignacionPuntosEditComponent;
  let fixture: ComponentFixture<AsignacionPuntosEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignacionPuntosEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacionPuntosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
