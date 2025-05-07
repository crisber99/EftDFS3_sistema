import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiServiceService } from '../../Service/api-service.service';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

interface RegistroPerfil {
  perfilName: string;
  perfilCod: number;
}

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  formularioUsuario!: FormGroup;

  constructor(
    private router: Router,
    private cookies: CookieService,
    private apiService: ApiServiceService,
    // private servicioReg: RegistroService,
    // private jsonPerfiles: PerfilService
  ) {
    this.formularioUsuario = new FormGroup({}

    );

  }

  Datos: any[] = [];

  ngOnInit(): void {
    this.lstUsuario();
  }


  lstUsuario() {

    this.apiService.getUsuarioAll()
      .subscribe((data: any) => {
        console.log('Usuarios:', data);
        this.Datos = data;
      },
        (error) => {
          console.error('Error al obtener los datos', error);
          this.MjePantalla('error', 'Error al obtener los datos. Error: ' + error.message)
        });

  }


  MjePantalla(tipo: String, mje: String) {
    switch (tipo) {
      case 'error':
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: '' + mje
        });
        break;
      case 'ok':
        Swal.fire({
          title: mje,
          icon: "success",
          draggable: true
        });
    }

  }
}