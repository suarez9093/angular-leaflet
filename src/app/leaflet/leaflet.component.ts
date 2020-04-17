import { Component, OnInit, OnChanges, Input } from "@angular/core";
import { WeatherSearchService } from "../weather-search.service";
import { WeatherSearch } from "../weather-search";
import { RandomNumberService } from "../random-number.service";
import { RandomNumber } from "../random-number";

declare let L;

@Component({
  selector: "app-leaflet",
  templateUrl: "./leaflet.component.html",
  styleUrls: ["./leaflet.component.css"]
})
export class LeafletComponent implements OnInit {
  public currentCoordinates = [51.505, -0.09];
  coordinates = [];
  searchQuery: number;
  searchResults: WeatherSearch;
  mymap;
  circle;

  constructor(
    private WeatherSearchService: WeatherSearchService,
    private RandomNumberSerive: RandomNumberService
  ) {}

  ngOnInit() {
    this.mymap = L.map("mapid").setView(this.currentCoordinates, 2);

    var popup = L.popup();

    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1Ijoic3VhcmV6OTA5MyIsImEiOiJjazdtbXk4Y2Uwa2FlM2xucjNocHdwOTR6In0.Idg85NpqSu9BGnw9FktCIQ"
      }
    ).addTo(this.mymap);

    this.WeatherSearchService.searchWeather("london").then(
      response => {
        this.searchResults = response;
        console.log("searchResults: ", this.searchResults);
        var circle = L.circle(
          [this.searchResults.coord.lat, this.searchResults.coord.lon],
          {
            color: "red",
            fillColor: "#f03",
            fillOpacity: 0.5,
            radius: 50000
          }
        ).addTo(this.mymap);
      },
      error => console.log(error)
    );

    this.RandomNumberSerive.generateCoordinates(1).then(
      response => {
        console.log("lat: ", response.result.random.data);
      },
      error => console.log(error)
    );
  }

  // Functions
  // ========================================================
  searchWeather = () => {
    this.WeatherSearchService.searchWeather("london").then(
      response => {
        this.searchResults = response;
        console.log(this.searchResults);
      },
      error => console.log(error.statusBack)
    );
  };

  generateWeatherPoints = () => {
    this.RandomNumberSerive.generateCoordinates(this.searchQuery).then(
      response => {
        const points = response.result.random.data;
        console.log("weather Point: ", points);
        for (let i = 0; i < points.length; i++) {
          this.coordinates.push(points[i]);
        }
        console.log("coordinates: ", this.coordinates);
      },
      error => console.log(error)
    );
    this.addMapMarker();
  };

  addMapMarker = () => {
    for (let i = 0; i < this.coordinates.length; i++) {
      console.log("this.coordinates[i][0]: ", this.coordinates[i][0]);
      console.log("this.coordinates[i][1]: ", this.coordinates[i][1]);
      var circle = L.circle([this.coordinates[i][0], this.coordinates[i][1]], {
        color: "red",
        fillColor: "#f03",
        fillOpacity: 0.5,
        radius: 50000
      }).addTo(this.mymap);
    }
  };
}
