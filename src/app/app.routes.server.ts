import { inject } from '@angular/core';
import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';
import { Pokemons as PokemonService } from './pokemons/services/pokemons';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'about',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'pokemons/page/:page',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.Server,
    getPrerenderParams: async () => {
      const pages = [];
      for (let page = 1; page <= 20; page++) {
        pages.push({ page: page.toString() });
      }
      return pages;
    },
  },
  {
    path: 'contact',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'pricing',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'pokemons/:name',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.Server,
    getPrerenderParams: async () => {
      const pokemonService = inject(PokemonService);
      let pokemonNames: { name: string }[] = [];
      pokemonService.loadPage(1).subscribe((pokemons) =>
        pokemons.map((p) => {
          pokemonNames.push({ name: p.name });
        }),
      );
      return pokemonNames;
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
