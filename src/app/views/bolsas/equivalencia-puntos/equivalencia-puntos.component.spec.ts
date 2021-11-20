import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquivalenciaPuntosComponent } from './equivalencia-puntos.component';

describe('EquivalenciaPuntosComponent', () => {
  let component: EquivalenciaPuntosComponent;
  let fixture: ComponentFixture<EquivalenciaPuntosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquivalenciaPuntosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquivalenciaPuntosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
