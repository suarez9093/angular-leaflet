import { Component, OnInit } from "@angular/core";
declare let L;

@Component({
  selector: "app-leaflet",
  templateUrl: "./leaflet.component.html",
  styleUrls: ["./leaflet.component.css"]
})
export class LeafletComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const mymap = L.map("mapid").setView([51.505, -0.09], 13);
    var marker = L.marker([51.5, -0.09]).addTo(mymap);
    var circle = L.circle([51.508, -0.11], {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 500
    }).addTo(mymap);
    var polygon = L.polygon([
      [51.509, -0.08],
      [51.503, -0.06],
      [51.51, -0.047]
    ]).addTo(mymap);
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
  }
}
