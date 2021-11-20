import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorConceptoPuntosComponent } from './buscador-concepto-puntos.component';

describe('BuscadorConceptoPuntosComponent', () => {
  let component: BuscadorConceptoPuntosComponent;
  let fixture: ComponentFixture<BuscadorConceptoPuntosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscadorConceptoPuntosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorConceptoPuntosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
