import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiServiceService } from '../../Service/api-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(
    //private jsonUsuario: UsuarioService,
    private cookies: CookieService,
    private apiService: ApiServiceService,
  ) { }
  
public Nombre = this.apiService.getCookie('nombre');
}
