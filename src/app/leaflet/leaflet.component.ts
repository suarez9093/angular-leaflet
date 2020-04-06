import { Component, OnInit, OnChanges } from "@angular/core";
import { WeatherSearchService } from "../weather-search.service";
import { WeatherSearch } from "../weather-search";
import { RandomNumberService } from "../random-number.service";
import { RandomNumber } from "../random-number";

declare let L;

@Component({
  selector: "app-leaflet",
  templateUrl: "./leaflet.component.html",
  styleUrls: ["./leaflet.component.css"],
})
export class LeafletComponent implements OnInit {
  collecitonOfCoordinates = [];
  coordinates = [0, 0];
  searchQuery: number;
  searchResults: WeatherSearch;
  constructor(
    private WeatherSearchService: WeatherSearchService,
    private RandomNumberSerive: RandomNumberService
  ) {}

  ngOnInit() {
    let mymap = L.map("mapid").setView([51.505, -0.09], 2);

    var popup = L.popup();

    function onMapClick(e) {
      popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
    }

    mymap.on("click", onMapClick);

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
          "pk.eyJ1Ijoic3VhcmV6OTA5MyIsImEiOiJjazdtbXk4Y2Uwa2FlM2xucjNocHdwOTR6In0.Idg85NpqSu9BGnw9FktCIQ",
      }
    ).addTo(mymap);

    this.WeatherSearchService.searchWeather("london").then(
      (response) => {
        this.searchResults = response;
        console.log("searchResults: ", this.searchResults);
        var circle = L.circle(
          [this.searchResults.coord.lat, this.searchResults.coord.lon],
          {
            color: "red",
            fillColor: "#f03",
            fillOpacity: 0.5,
            radius: 50000,
          }
        ).addTo(mymap);
      },
      (error) => console.log(error)
    );
    //
    this.RandomNumberSerive.generateCoordinates(1).then(
      (response) => {
        console.log("lat: ", response.result.random.data);
      },
      (error) => console.log(error)
    );

    //
  }
  searchWeather = () => {
    this.WeatherSearchService.searchWeather("london").then(
      (response) => {
        this.searchResults = response;
        console.log(this.searchResults);
      },
      (error) => console.log(error.statusBack)
    );
  };

  generateWeatherPoints = () => {
    this.RandomNumberSerive.generateCoordinates(this.searchQuery).then(
      (response) => {
        console.log("weather Point: ", response.result.random.data);
      },
      (error) => console.log(error)
    );
  };
}
