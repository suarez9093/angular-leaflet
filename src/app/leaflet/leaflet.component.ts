import { Component, OnInit } from "@angular/core";
import { WeatherSearchService } from "../weather-search.service";
declare let L;

@Component({
  selector: "app-leaflet",
  templateUrl: "./leaflet.component.html",
  styleUrls: ["./leaflet.component.css"]
})
export class LeafletComponent implements OnInit {
  constructor(private WeatherSearchService: WeatherSearchService) {}
  coordinates = {
    lon: 0,
    lat: 0
  };

  ngOnInit() {
    const mymap = L.map("mapid").setView([51.505, -0.09], 13);
    // var marker = L.marker([51.5, -0.09]).addTo(mymap);
    var marker;
    var circle;

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
          "pk.eyJ1Ijoic3VhcmV6OTA5MyIsImEiOiJjazdtbXk4Y2Uwa2FlM2xucjNocHdwOTR6In0.Idg85NpqSu9BGnw9FktCIQ"
      }
    ).addTo(mymap);

    this.WeatherSearchService.searchWeather("london").then(
      res => {
        console.log("response", res["coord"]);
        marker = L.marker([res["coord"]["lon"], res["coord"]["lat"]]).addTo(
          mymap
        );
        circle = L.circle([51.508, -0.11], {
          color: "red",
          fillColor: "#f03",
          fillOpacity: 0.5,
          radius: 500
        }).addTo(mymap);
        // this.coordinates.lat = res["coord"]["lat"];
        // this.coordinates.lon = res["coord"]["lon"];
      },
      error => console.log(error)
    );
  }
}
