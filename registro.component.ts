import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Importar HttpClient
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) { // Inyectar HttpClient
    this.registroForm = this.fb.group({
      usuario: ['', Validators.required],
      nivelEjercicio: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  get usuarioError() {
    const control = this.registroForm.get('usuario');
    return control && control.invalid && (control.dirty || control.touched);
  }

  get nivelEjercicioError() {
    const control = this.registroForm.get('nivelEjercicio');
    return control && control.invalid && (control.dirty || control.touched);
  }

  get contrasenaError() {
    const control = this.registroForm.get('contrasena');
    return control && control.invalid && (control.dirty || control.touched);
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const payload = {
        usuario: this.registroForm.get('usuario')?.value,
        contrasena: this.registroForm.get('contrasena')?.value,
        nivel_ej: this.registroForm.get('nivelEjercicio')?.value
      };
      console.log('Payload:', payload);
      // Enviar el payload
      this.http.post('http://localhost:3001/registro', payload).subscribe({
        next: (res) => {
          console.log('Respuesta del servidor:', res);
          // Navegar al componente seleccion-ejercicios
          this.router.navigate([`/seleccion/${payload.usuario}`]); // Redirigir al componente de selección
        },
        error: (err) => {
          console.error('Error al registrar el usuario:', err);
        }
      });
    } else {
      console.log('Formulario no válido');
    }
  }
}
