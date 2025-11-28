import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEjerciciosComponent } from './info-ejercicios.component';

describe('InfoEjerciciosComponent', () => {
  let component: InfoEjerciciosComponent;
  let fixture: ComponentFixture<InfoEjerciciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoEjerciciosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoEjerciciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
