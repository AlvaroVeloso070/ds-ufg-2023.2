import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "./login/auth.service";
import {BaseServiceProvider} from "./base-service.provider";
import {Injectable} from "@angular/core";
import {Config} from "../config/config";

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService{
  protected http: HttpClient;
  protected router: Router;
  protected authService: AuthService;

  readonly apiUrl : string = Config.getApiUrl();

  readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  })

  protected constructor(baseServiceProvider: BaseServiceProvider) {
    this.http = baseServiceProvider.getHttp();
    this.router = baseServiceProvider.getRouter();
    this.authService = baseServiceProvider.getAuthService();
  }

  protected get(endpoint: string) {
    return this.http.get<any>(this.apiUrl + endpoint, {headers: this.headers});
  }

  protected getById(endpoint: string, id: number) {
    return this.http.get<any>(this.apiUrl + endpoint + '/' + id, {headers: this.headers});
  }

  protected post(endpoint: string, body: any) {
    return this.http.post<any>(this.apiUrl + endpoint, body, {headers: this.headers});
  }

  protected put(endpoint: string, body: any) {
    return this.http.put<any>(this.apiUrl + endpoint, body, {headers: this.headers});
  }

  protected delete(endpoint: string, id: number) {
    return this.http.delete<any>(this.apiUrl + endpoint + '/' + id, {headers: this.headers});
  }
}
