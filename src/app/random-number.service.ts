import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RandomNumber } from "./random-number";

@Injectable({
  providedIn: "root",
})
export class RandomNumberService {
  constructor(private http: HttpClient) {}

  generateLat = (query: number): Promise<RandomNumber> => {
    let promise = new Promise<RandomNumber>((resolve, reject) => {
      this.http
        .post("https://api.random.org/json-rpc/2/invoke", {
          jsonrpc: "2.0",
          method: "generateIntegers",
          params: {
            apiKey: "f47e402c-ba3e-4ca9-8842-55e557335be7",
            n: 1,
            min: -90,
            max: 90,
            replacement: true,
            base: 10,
          },
          id: 29091,
        })
        .toPromise()
        .then(
          (res) => {
            resolve(res as RandomNumber);
          },
          (error) => reject(error)
        );
    });
    return promise;
  };
  generateCoordinates = (query: number): Promise<RandomNumber> => {
    let promise = new Promise<RandomNumber>((resolve, reject) => {
      this.http
        .post("https://api.random.org/json-rpc/2/invoke", {
          jsonrpc: "2.0",
          method: "generateIntegerSequences",
          params: {
            apiKey: "00000000-0000-0000-0000-000000000000",
            n: query,
            length: 2,
            min: -90,
            max: 80,
            replacement: true,
            base: 10,
          },
          id: 15319,
        })
        .toPromise()
        .then(
          (res) => {
            resolve(res as RandomNumber);
          },
          (error) => reject(error)
        );
    });
    return promise;
  };
}
