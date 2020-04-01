import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// import "rxjs/add/operator/toPromise";

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) {}
  // sampleObservable = () => {
  //   this.http.get(
  //     "https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=2bbbf8e95178ddb66341a6d463360ced"
  //   );
  // };
  samplePromise = () => {
    this.http
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=2bbbf8e95178ddb66341a6d463360ced"
      )
      .toPromise();
  };

  // usingObservable = () => {
  //   this.sampleObservable().subscribe(
  //     result => {
  //       console.log(result);
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // };
  // usingPromise = () => {
  //   this.samplePromise().then(
  //     result => {
  //       console.log(result);
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // };
}
