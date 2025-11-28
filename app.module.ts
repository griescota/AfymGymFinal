import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importar ReactiveFormsModule

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    FormsModule, // Agregar FormsModule
    ReactiveFormsModule // Agregar ReactiveFormsModule
  ],
})
export class AppModule { }
