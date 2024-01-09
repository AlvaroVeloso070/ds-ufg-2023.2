import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  readonly configUrl = 'assets/config.json'

  constructor(private http: HttpClient) { }

  getConfig() : Observable<any> {
    console.log(this.http.get(this.configUrl))
    return this.http.get(this.configUrl);
  }
}
