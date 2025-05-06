import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private urlUsuario = 'http://localhost:8080/usuario';

  constructor(private http: HttpClient,
    private cookieService: CookieService
  ) { }

  getUsuarioAll(){
    return this.http.get(this.urlUsuario);
  }

  postAddUser(nombre:String, ap_paterno:String, email: String, pass: String, rol:String, rut:String){
return this.http.post(`${this.urlUsuario}/add`, { nombre, ap_paterno, email, pass, rol, rut });
  }

  postUsuarioLogin(rut: String, pass: String){
    return this.http.post(`${this.urlUsuario}/login`, { rut, pass });
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getCookie(name: string): string {
    return this.cookieService.get(name);
  }

  setCookie(name: string, valor: string) {
    this.cookieService.set(name, valor);
  }
}
