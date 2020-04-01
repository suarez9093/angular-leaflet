import { Component } from "@angular/core";
import { ConfigService } from "./config.service";
import { Config } from "protractor";
// import { MessageService } from "../message.service";
import { HttpClient } from "@angular/common/http";
// import "rxjs/add/operator/toPromise";

@Component({
  selector: "app-config",
  templateUrl: "./config.component.html",
  providers: [ConfigService]
})
export class ConfigComponent {
  constructor(private http: HttpClient) {}
  samplePromise = () => {
    return this.http
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=2bbbf8e95178ddb66341a6d463360ced"
      )
      .subscribe(result => {
        console.log("result: ", result);
      });
  };
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
