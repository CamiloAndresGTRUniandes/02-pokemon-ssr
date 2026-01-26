import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { PokemonList } from '../../pokemons/components/pokemon-list/pokemon-list';
import { PokemonListSkeleton } from './ui/pokemon-list-skeleton/pokemon-list-skeleton';
import { Pokemons as PokemonsService } from '../../pokemons/services/pokemons';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/internal/operators/map';
import { tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonList, PokemonListSkeleton, RouterLink],
  templateUrl: './pokemons-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPage  {
  public isLoading = signal(true);
  private pokemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);

  private route = inject(ActivatedRoute);
  private title = inject(Title);
  public currentPage = toSignal<number>(
    this.route.params.pipe(
      //map( params => Number(params['page'] || '1'))
      // Default to page 1 if 'page' param is missing or invalid
      map((params) => {
        const pageParam = params['page'] ?? '1';
        const pageNumber = Number(pageParam);
        return isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber;
      }),
    ),
  );

  public loadOnPageChanged = effect(() => {
    this.loadPokemnos(this.currentPage());
  }, { allowSignalWrites: true });

  // Load Pokemons for the given page number
  public loadPokemnos(nextPage = 0) {
    const pageToLoad = nextPage > 0 ? nextPage : 1;
    this.pokemonsService
      .loadPage(pageToLoad)
      .pipe(
        tap(() => {
          this.title.setTitle(`Pokemons SSR - Página ${pageToLoad}`);
        }),
      )
      .subscribe({
        next: (pokemons) => {
          this.pokemons.set(pokemons);
            this.isLoading.set(false);
        },
        error: (err) => {
          console.log({ err });
        },
      });
  }
}
