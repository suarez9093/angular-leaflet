import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";

export interface Config {
  weatherUrl: string;
}

@Injectable()
export class ConfigService {
  configUrl = "./assets/config.json";
  constructor(private http: HttpClient) {}

  getConfig() {
    return this.http.get(this.configUrl);
  }
}
