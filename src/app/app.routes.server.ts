import { inject } from '@angular/core';
import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';
import { Pokemons as PokemonService } from './pokemons/services/pokemons';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'about',
    renderMode: RenderMode.Prerender

  },
  {
    path: 'contact',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'pricing',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'pokemons/:id',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.Client,
    getPrerenderParams: async () => {
      const pokemonService = inject(PokemonService);
      let pokemonIds: { id: string }[] = [];
      await pokemonService.loadPage(1).subscribe(
        pokemons => pokemons.map(p => {
          pokemonIds.push({ id: p.id.toString() });
        })
      );
      return pokemonIds;
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  }
];
