import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { LeafletComponent } from "./leaflet/leaflet.component";
import { WeatherSearchService } from "./weather-search.service";
import { WeatherDetailComponent } from "./weather-detail/weather-detail.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeafletComponent,
    WeatherDetailComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [WeatherSearchService],
  bootstrap: [AppComponent],
})
export class AppModule {}
