import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

private _historial: string[] = [];

get historial(){
 // this._historial = this._historial.splice(0, 10);
  //[...romper la referencia y retornar un nuevo arreglo]
  return [...this._historial];
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
}

}

