import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageServiceService} from '../local-storage-service.service';
import { Router } from '@angular/router';
import{UserServiceService }from '../user-service.service'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-ejercicios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-ejercicios.component.html',
  styleUrl: './info-ejercicios.component.css'
})
export class InfoEjerciciosComponent implements OnInit {

  nombreUsuario: string | null = null;
  ejercicioNombre: string = "";
  informacionEjercicio: string = "";
  imagenUrl: string = "";
  contador: number = 0;
  botonBloqueado: boolean = false;
  mostrarVentana: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageServiceService
    , private userService: UserServiceService
  ) { }

  ngOnInit(): void {
    const nombre = this.route.snapshot.paramMap.get('nombre');
    this.nombreUsuario = this.userService.getUserName();
    console.log(this.nombreUsuario);
    
    if (nombre) {

      this.ejercicioNombre = nombre;
      this.informacionEjercicio = this.localStorageService.getInformacion(this.ejercicioNombre);
      this.imagenUrl = this.localStorageService.getImagen(this.ejercicioNombre);
    } else {

    }
    this.contador = this.localStorageService.getIterador();
  }


  volver(): void {

    const usuario = this.nombreUsuario ?? 'defaultUser';
    this.router.navigate(['/seleccion', usuario]);
  }

  incrementarContador(): void {
    this.botonBloqueado = true;
    this.contador++;
    this.localStorageService.setIterador(this.contador);
    this.mostrarVentana = true;

    setTimeout(() => {
      this.botonBloqueado = false;
    }, 2000);
  }

  cerrarVentana(): void {
    this.mostrarVentana = false;
  }
}
