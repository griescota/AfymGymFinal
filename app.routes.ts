
import { Routes} from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ProgresoComponent } from './progreso/progreso.component';
import { RegistroComponent } from './registro/registro.component';
import { SeleccionEjerciciosComponent } from './seleccion-ejercicios/seleccion-ejercicios.component';
import { InfoEjerciciosComponent } from './info-ejercicios/info-ejercicios.component';

export const routes: Routes = [
  { path: '', component: InicioComponent},
  { path: 'inicio', component: InicioComponent},
  { path: 'progreso', component: ProgresoComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'seleccion/:nombre', component: SeleccionEjerciciosComponent},
  { path: 'informacion/:nombre', component: InfoEjerciciosComponent},
  { path: '**', component: InicioComponent}
];
