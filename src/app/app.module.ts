import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { LeafletComponent } from "./leaflet/leaflet.component";
import { WeatherSearchService } from "./weather-search.service";

@NgModule({
  declarations: [AppComponent, HeaderComponent, LeafletComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [WeatherSearchService],
  bootstrap: [AppComponent]
})
export class AppModule {}
