import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject } from 'rxjs';
import { ApiServiceService } from '../../Service/api-service.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  providers: [CookieService]
})
export class MenuComponent {
  private destroy$ = new Subject<void>();
  constructor(
    private router: Router,
    private cookies: CookieService,
    private apiService: ApiServiceService,
  ) { }

  Usuarios: any[] = [];
  PerfilAdmin: boolean = false;
  PerfilModerador: boolean = false;

  ngOnInit(): void {
    // this.jsonUsuario.getJsonDataUsuario().subscribe(data => {
    //   this.Usuarios = data;
    // });
    this.getPerfil();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getPerfil() {
    const myCookieValue = this.apiService.getCookie('perfil');

    if (myCookieValue != null) {
      if (myCookieValue == '1')//1 = ADMIN
        this.PerfilAdmin = true;
      else
        this.PerfilAdmin = false;

      if (myCookieValue == '3')//1 = ADMIN
        this.PerfilModerador = true;
      else
        this.PerfilModerador = false;
    }
    else {
      this.PerfilAdmin = false;
      this.PerfilModerador = false;
    }

    true;

  }

  logout() {
    const loginUrl = '/home';
    this.cookies.deleteAll();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigateByUrl(loginUrl);
    //window.location.reload();
  }
}
