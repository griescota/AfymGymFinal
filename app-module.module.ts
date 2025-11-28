import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importar ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule, // Agregar FormsModule
    ReactiveFormsModule, // Agregar ReactiveFormsModule
    HttpClientModule ,
    DatePipe
  ]
})
export class AppModuleModule { }
