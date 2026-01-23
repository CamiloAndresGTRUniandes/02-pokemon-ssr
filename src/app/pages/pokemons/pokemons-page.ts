import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { PokemonList } from '../../pokemons/components/pokemon-list/pokemon-list';
import { PokemonListSkeleton } from './ui/pokemon-list-skeleton/pokemon-list-skeleton';
import { Pokemons as PokemonsService } from '../../pokemons/services/pokemons';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/internal/operators/map';
import { tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonList, PokemonListSkeleton],
  templateUrl: './pokemons-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPage implements OnInit, OnDestroy {
  public isLoading = signal(true);
  private pokemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);
  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      //map( params => Number(params['page'] || '1'))
      // Default to page 1 if 'page' param is missing or invalid
      map((params) => {
        const pageParam = params.get('page');
        const pageNumber = Number(pageParam);
        return isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber;
      }),
    ),
  );

  // private appRef = inject(ApplicationRef);
  // private $appState = this.appRef.isStable.subscribe((isStable) => {
  //   if (isStable) {
  //     this.isLoading.set(false);
  //   }
  // });

  ngOnInit(): void {
    this.loadPokemnos();
  }

  // Load Pokemons for the given page number
  public loadPokemnos(nextPage = 0) {
    const pageToLoad = this.currentPage()! + nextPage;
    console.log({ pagetoload: pageToLoad, current: this.currentPage() });
    this.pokemonsService
      .loadPage(pageToLoad)
      .pipe(
        tap(() => {
          this.router.navigate([], {
            queryParams: { page: pageToLoad },
          });
          this.title.setTitle(`Pokemons SSR - Página ${pageToLoad}`);
        }),
      )
      .subscribe({
        next: (pokemons) => {
          //console.log({pokemons});
          this.pokemons.set(pokemons);
          // setTimeout(() => {
            this.isLoading.set(false);
          // }, 100);
        },
        error: (err) => {
          console.log({ err });
        },
      });
  }

  ngOnDestroy(): void {
    // this.$appState.unsubscribe();
  }
}
