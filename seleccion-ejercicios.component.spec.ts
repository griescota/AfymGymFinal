import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionEjerciciosComponent } from './seleccion-ejercicios.component';

describe('SeleccionEjerciciosComponent', () => {
  let component: SeleccionEjerciciosComponent;
  let fixture: ComponentFixture<SeleccionEjerciciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionEjerciciosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeleccionEjerciciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
