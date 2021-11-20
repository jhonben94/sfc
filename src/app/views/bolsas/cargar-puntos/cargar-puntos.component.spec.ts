import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarPuntosComponent } from './cargar-puntos.component';

describe('CargarPuntosComponent', () => {
  let component: CargarPuntosComponent;
  let fixture: ComponentFixture<CargarPuntosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargarPuntosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarPuntosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
