import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  setIdUsuarioLogado(idUsuarioLogado: number) {
    sessionStorage.setItem('idUsuarioLogado', idUsuarioLogado.toString());
  }

  getIdUsuarioLogado(): number{
    return Number(sessionStorage.getItem('idUsuarioLogado'));
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  autenticarSessao(response : any) {
    this.setToken(response.accessToken);
    this.setIdUsuarioLogado(response.usuarioId);
  }

  constructor() { }

  logout() {
    sessionStorage.clear()
  }
}
