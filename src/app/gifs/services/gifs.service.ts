import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
 
 
  private apiKey: string = 'OVDmKTCFm2JtKNPKnwUsjIyE0FUW4hLq';

  private _historial: string[] = [];

  public resultado : any[] = [];
 
get historial(){
 // this._historial = this._historial.splice(0, 10);
  //[...romper la referencia y retornar un nuevo arreglo]
  return [...this._historial];
}

constructor(private http: HttpClient) {

}

buscarGifs( query : string){

query = query.trim().toLowerCase();

//this._historial.unshift(query);
//primero hago la comprovacion si no lo incluye lo inserto
  if(!this._historial.includes(query)){
    this._historial.unshift(query);
  }

  this._historial = this._historial.splice(0, 10);
   console.log(this._historial);


   this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=OVDmKTCFm2JtKNPKnwUsjIyE0FUW4hLq&q=${query}&limit=10`)
   .subscribe((resp : any) => {
   console.log(resp.data);
  this.resultado = resp.data; 
  });
   

  }


}

