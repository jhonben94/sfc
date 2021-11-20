import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilizarPuntosComponent } from './utilizar-puntos.component';

describe('UtilizarPuntosComponent', () => {
  let component: UtilizarPuntosComponent;
  let fixture: ComponentFixture<UtilizarPuntosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilizarPuntosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilizarPuntosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
