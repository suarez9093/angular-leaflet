import { Component } from "@angular/core";
import { Config, ConfigService } from "./config.service";
// import { MessageService } from "../message.service";

@Component({
  selector: "app-config",
  templateUrl: "./config.component.html",
  providers: [ConfigService]
})
export class ConfigComponent {
  config: Config;

  constructor(private configService: ConfigService) {}
  showConfig() {
    this.configService.getConfig().subscribe(
      (data: Config) =>
        (this.config = {
          weatherUrl: data["weatherUrl"]
        })
    );
  }
}
