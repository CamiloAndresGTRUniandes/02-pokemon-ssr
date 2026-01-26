import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces';
import {Pokemons as PokemonService } from '../../pokemons/services/pokemons';
import { ActivatedRoute } from '@angular/router';
import {TitleCasePipe} from '@angular/common'
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemon-page',
  imports: [TitleCasePipe],
  templateUrl: './pokemon-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPage implements OnInit {
  private pokemonService = inject(PokemonService);
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);
  public pokemon = signal<Pokemon | null>(null);


ngOnInit(): void {
  const name = this.route.snapshot.paramMap.get('name');
  if(!name) return;
    this.pokemonService.getPokemonById(name!)
    .pipe(
      tap( ({name, id, sprites: { other }}) => {
        const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
        const pageTitle = `#${id} - ${capitalizedName} - Pokémon Details`;
        const pageDescription = `Details and information about ${capitalizedName}, a Pokémon species.`;
        this.title.setTitle(pageTitle);
        this.meta.updateTag({ name: 'description', content: pageDescription });
        this.meta.updateTag({ name: 'og:title', content: pageTitle });
        this.meta.updateTag({ name: 'og:description', content: pageDescription });
        this.meta.updateTag({ name: 'og:image', content: other?.['official-artwork']?.front_default || '' });
      })
    )
    .subscribe(this.pokemon.set);
  }
}
