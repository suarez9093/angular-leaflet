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
  // Current coordinates that map defaults to on load
  public currentCoordinates = [51.505, -0.09];
  // array to store all of the queries from the api call
  coordinates = [];
  // how many random api calls to generate
  searchQuery: number;
  // the results are going to take the structure of the WeatherSearch interface
  searchResults: WeatherSearch;
  // Setting the variable for the map
  mymap;
  // Setting the variable for the circules
  circle;
  // setting a variable for the pop ups
  popup = L.popup();

  constructor(
    private WeatherSearchService: WeatherSearchService,
    private RandomNumberSerive: RandomNumberService
  ) {}

  ngOnInit() {
    // initilizing the map to specific coordinates and a zoom
    this.mymap = L.map("mapid").setView(this.currentCoordinates, 2);

    // Leaflet code for generating map
    // ====================================================
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
    // ====================================================
  }

  // Functions
  // ========================================================

  //
  searchWeather = (lat, lon) => {
    this.WeatherSearchService.searchWeather(lat, lon).then(
      response => {
        this.searchResults = response;
        console.log("search Results: ", this.searchResults);
      },
      error => console.log("Error: ", error.statusBack)
    );
  };

  generateWeatherPoints = () => {
    this.RandomNumberSerive.generateCoordinates(this.searchQuery).then(
      response => {
        let points: number[][] = response.result.random.data;
        console.log("points: ", points);
        for (let i = 0; i < points.length; i++) {
          var circle = L.circle([points[i][0], points[i][1]], {
            color: "red",
            fillColor: "#f03",
            fillOpacity: 0.5,
            radius: 50000
          }).addTo(this.mymap);

          this.searchWeather(points[i][0], points[i][1]);
        }
        console.log("Random coordinates: ", this.coordinates);
      },
      error => console.log(error)
    );
    // this.addMapMarker();
  };

  onMapClick = e => {
    this.popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(this.mymap);
  };

  // =======================================================================
}
