import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/interfacesGifs';


@Injectable({
  providedIn: 'root'
})
export class GifsService {


  private apiKey     : string = 'OVDmKTCFm2JtKNPKnwUsjIyE0FUW4hLq';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial : string[] = [];
  public resultado   : Gif[] = [];

  get historial() {
    // this._historial = this._historial.splice(0, 10);
    //[...romper la referencia y retornar un nuevo arreglo]
    return [...this._historial];
  }

  constructor(private http: HttpClient) {

    //this._historial = localStorage.getItem("historial");

    this._historial = JSON.parse(localStorage.getItem("historial")!) || [];
    this.resultado = JSON.parse(localStorage.getItem("resultado")!) || [];


  }

  buscarGifs(query: string) {

    query = query.trim().toLowerCase();

    //this._historial.unshift(query);
    //primero hago la comprovacion si no lo incluye lo inserto
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem("historial", JSON.stringify(this._historial));

    }
    console.log(this._historial);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);
    console.log(params.toString());

    //la respuesta luce como la interface SearchGifsResponse
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
      .subscribe((resp) => {
        console.log(resp.data);
        this.resultado = resp.data;

        localStorage.setItem("resultado", JSON.stringify(this.resultado));

      });


  }


}

