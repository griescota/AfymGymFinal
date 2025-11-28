import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageServiceService} from '../local-storage-service.service';
import{UserServiceService} from '../user-service.service';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-progreso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progreso.component.html',
  styleUrl: './progreso.component.css'
  ,providers: [DatePipe]
})
export class ProgresoComponent implements OnInit{
  nombreUsuario: string | null = null;
  iterador: number = 0;
  registros: any[] = [];
  esAdmin: boolean = false;

  constructor(
    private localStorageService: LocalStorageServiceService,
    private router: Router,
    private userService: UserServiceService,
    private datePipe: DatePipe,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.iterador = this.localStorageService.getIterador();
    this.nombreUsuario = this.userService.getUserName();
    this.esAdmin = this.nombreUsuario === 'administrador';
    console.log(this.nombreUsuario);

    if (this.esAdmin) {
      this.obtenerRegistros();
    }
  }

  irAtras(): void {
    const usuario = this.nombreUsuario ?? 'defaultUser';
    this.router.navigate(['/seleccion', usuario]);
  }

  anadirRegistro(): void {
    const fechaActual = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const registro = {
      usuario: this.nombreUsuario,
      progreso: this.iterador,
      fecha: fechaActual
    };

    this.http.post('http://localhost:3001/registro-progreso', registro).subscribe({
      next: (res) => {
        console.log('Registro guardado:', res);
      },
      error: (err) => {
        console.error('Error al guardar el registro:', err);
      }
    });
  }

  obtenerRegistros(): void {
    this.http.get('http://localhost:3001/registros-progreso').subscribe({
      next: (res: any) => {
        this.registros = res;
        console.log('Registros obtenidos:', res);
        console.log('this.registros:', this.registros);  // Asegúrate de que los registros están siendo asignados correctamente
      },
      error: (err) => {
        console.error('Error al obtener los registros:', err);
      }
    });
  }

  
  exportarPDF(): void {
    const doc = new jsPDF();
    const data = document.getElementById('registrosTabla');

    if (data) {
      html2canvas(data).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgProps = doc.getImageProperties(imgData);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        doc.save('registros.pdf');
      });
    }
  }
}