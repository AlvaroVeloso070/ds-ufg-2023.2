import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "./login/auth.service";

@Injectable({
    providedIn: 'root'
})
export class BaseServiceProvider{
  protected constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
  }

  public getHttp(): HttpClient {
    return this.http;
  }

  public getRouter(): Router {
    return this.router;
  }

  public getAuthService(): AuthService {
    return this.authService;
  }
}