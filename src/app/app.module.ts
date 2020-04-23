import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { LeafletComponent } from "./leaflet/leaflet.component";
import { WeatherSearchService } from "./weather-search.service";
import { WeatherDetailComponent } from "./weather-detail/weather-detail.component";
import { RandomNumberService } from "./random-number.service";
import { HomePageComponent } from "./home-page/home-page.component";
import { SavedPageComponent } from "./saved-page/saved-page.component";

const appRoutes: Routes = [
  {
    path: "",
    component: HomePageComponent
  },
  {
    path: "saved",
    component: SavedPageComponent
  }
  // {
  //   path: "**",
  //   component: NotFoundComponent
  // }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeafletComponent,
    WeatherDetailComponent,
    HomePageComponent,
    SavedPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [WeatherSearchService, RandomNumberService],
  bootstrap: [AppComponent]
})
export class AppModule {}
