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

  private endpoint : string | null = null

  readonly apiUrl : string = Config.getApiUrl();

  readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  })

  protected constructor(baseServiceProvider: BaseServiceProvider, endpoint : string) {
    this.http = baseServiceProvider.getHttp();
    this.router = baseServiceProvider.getRouter();
    this.authService = baseServiceProvider.getAuthService();
    this.endpoint = endpoint;
  }

  protected get() {
    return this.http.get<any>(this.apiUrl + this.endpoint, {headers: this.headers});
  }

  protected getById(id: number) {
    return this.http.get<any>(this.apiUrl + this.endpoint + '/' + id, {headers: this.headers});
  }

  protected post(body: any) {
    return this.http.post<any>(this.apiUrl + this.endpoint, body, {headers: this.headers});
  }

  protected put(body: any) {
    return this.http.put<any>(this.apiUrl + this.endpoint, body, {headers: this.headers});
  }

  protected delete(id: number) {
    return this.http.delete<any>(this.apiUrl + this.endpoint + '/' + id, {headers: this.headers});
  }
}
