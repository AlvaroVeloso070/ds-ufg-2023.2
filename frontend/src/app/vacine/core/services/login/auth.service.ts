import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string | null = null;
  private idUsuarioLogado: number | null = null;

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  setIdUsuarioLogado(idUsuarioLogado: number) {
    this.idUsuarioLogado = idUsuarioLogado;
  }

  getIdUsuarioLogado(): number | null {
    return this.idUsuarioLogado;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
  constructor() { }
}
