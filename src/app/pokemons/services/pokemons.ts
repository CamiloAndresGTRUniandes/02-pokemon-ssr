import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Pokemon, SimplePokemon } from '../interfaces';
import { PokeAPIResponse } from '../interfaces/pokemo-api-response';

@Injectable({
  providedIn: 'root'
})
export class Pokemons {
  private http = inject(HttpClient);
  public loadPage(page: number): Observable<SimplePokemon[]> {
    if(page !== 0){
      --page;
    }
    page = Math.max(0, page);

    return this.http.get<PokeAPIResponse>(
      `https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20`
    ).pipe(
      map(resp => {
        const simplePokemons: SimplePokemon[] = resp.results.map( (poke) => {
          const urlParts = poke.url.split('/');
          const id = urlParts[urlParts.length - 2];
          return {
            name: poke.name,
            id: id
          };
        });
        return simplePokemons;
      }),
      //tap( data => console.log(data))
    );
  }

  public getPokemonById(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
  }
}
