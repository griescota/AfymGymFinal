import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageServiceService {

  tareas = [
    {
      "nombre": "Empujar",
      "informacion": "El ejercicio de empujar es excelente para fortalecer los músculos del pecho, hombros y tríceps. Puedes realizarlo utilizando pesas, máquinas de ejercicio o simplemente con tu propio peso corporal."
      ,"imagenUrl": "../../assets/img/empujar.png"
   
    },
    {
      "nombre": "Levantarse",
      "informacion": "Levantarse es un ejercicio básico para fortalecer los músculos de las piernas y glúteos. Puedes hacerlo utilizando una silla resistente como apoyo y concentrándote en levantarte lentamente utilizando la fuerza de tus piernas."
    ,  "imagenUrl": "../../assets/img/levantar.png"

    },
    {
      "nombre": "Inclinarse",
      "informacion": "El ejercicio de inclinarse es ideal para trabajar los músculos del abdomen y la espalda baja. Debes realizarlo con cuidado, manteniendo la espalda recta y doblando las caderas para inclinarte hacia adelante."
      ,  "imagenUrl": "../../assets/img/saltar con los pies juntos.png"
    },
    {
      "nombre": "CerrarManos",
      "informacion": "Cerrar manos es un ejercicio que ayuda a fortalecer los músculos de los antebrazos y las manos. Puedes hacerlo utilizando una pelota de goma o un objeto similar que puedas apretar con fuerza."
      ,  "imagenUrl": "../../assets/img/manos en la tripa.png"}
  ]

  nombre = [
    {
      "nombre": "Empujar"

    }, { "nombre": "Levantarse" }, 
    {
      "nombre": "Inclinarse"
    }, 
    { "nombre": "CerrarManos", }
  ]

  constructor() { }

  getInformacion(nombre: string): string {
    const ejercicio = this.tareas.find(e => e.nombre === nombre);
    return ejercicio ? ejercicio.informacion : '';
  }

  getImagen(nombre: string): string {
    const ejercicio = this.tareas.find(e => e.nombre === nombre);
    return ejercicio ? ejercicio.imagenUrl : '';
  }

  getNombres() {
    return this.nombre;
  }
  getTareas(){
    return this.tareas;
  }


  setIterador(valor: number): void {
    localStorage.setItem('iterador', valor.toString());
  }

  getIterador(): number {
    const iterador = localStorage.getItem('iterador');
    return iterador !== null ? parseInt(iterador, 10) : 0;
  }
}


