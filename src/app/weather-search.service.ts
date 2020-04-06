import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { WeatherSearch } from "./weather-search";

@Injectable({
  providedIn: "root"
})
export class WeatherSearchService {
  cashedValue: Array<{
    [query: string]: WeatherSearch;
  }> = [];
  constructor(private http: HttpClient) {}

  searchWeather = (query: string): Promise<WeatherSearch> => {
    let promise = new Promise<WeatherSearch>((resolve, reject) => {
      if (this.cashedValue[query]) {
        resolve(this.cashedValue[query]);
      } else {
        this.http
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=fe3985bc44d386b1f20d37b6e0b4e4a9`
          )
          .toPromise()
          .then(
            res => {
              resolve(res as WeatherSearch);
            },
            error => reject(error)
          );
      }
    });
    return promise;
  };
}
