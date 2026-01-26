
This project is an Angular 21 SSR application (Netlify + Express examples) using standalone components and lazy-loaded pages.

Key areas you should know and follow when modifying code here:

- Architecture: SSR + client. Server entry points: `src/main.server.ts` and `src/server.ts`. Browser entry: `src/main.ts`.
- Routing: Routes live in `src/app/app.routes.ts` (client lazy-loads with `loadComponent`). Server-specific routing overrides appear in `src/app/app.routes.server.ts` when needed.
- App bootstrap: app is bootstrapped with `bootstrapApplication(App, config)` — follow the config pattern in `src/app/app.config.ts` and `src/app/app.config.server.ts`.
- SSR handling: `src/server.ts` uses `@angular/ssr/node`'s `AngularNodeAppEngine` and serves static files from `dist/*/browser`. Add simple Express API endpoints in `src/server.ts` only when they must run on the Node side.

Developer workflows / commands (from `package.json`):

- Dev server: `npm start` (runs `ng serve`).
- Build: `npm run build` (runs `ng build`).
- Watch build (dev): `npm run watch`.
- Tests: `npm test` or `ng test` (project uses Angular tooling; `vitest` appears in devDependencies but use the configured `ng test`).
- SSR run after build: `npm run serve:ssr:pokemon-ssr` -> `node dist/pokemon-ssr/server/server.mjs` (Node >=20 required).

Project-specific conventions and examples:

- File layout: pages and components use paired `.ts` + `.html` files under `src/app/pages` and `src/app/pokemons/components`. Keep that pattern.
- Lazy routes: use `loadComponent: () => import('./pages/xyz/xyz-page')` as in `src/app/app.routes.ts` — keep relative imports and default exports.
- Services: example `src/app/pokemons/services/pokemons.ts` uses `inject(HttpClient)` and returns RXJS observables. Follow this style (no constructor injection required).
- Templates: external `.html` files are used (avoid inlining unless tiny). Templates follow simple bindings; avoid heavy logic in templates—compute in the component.

Integration points / external dependencies:

- PokeAPI: `https://pokeapi.co/api/v2` is used by `Pokemons` service; treat it as an external data source for pager and detail views.
- Netlify runtime: `@netlify/angular-runtime` is present; `src/server.ts` exports `netlifyCommonEngineHandler` for Netlify functions.

Editing guidance for common tasks:

- Add a client route: update `src/app/app.routes.ts` with a lazy `loadComponent` entry and place the page under `src/app/pages/...`.
- Add a server API endpoint: edit `src/server.ts` and add an `app.get('/api/...', ...)` handler before the SSR middleware.
- Debug SSR locally: `npm run build` -> `npm run serve:ssr:pokemon-ssr` then open the port printed by the server (defaults to 4000 or `PORT`).

What to avoid / project rules:

- Do not change the bootstrap approach — use `bootstrapApplication` and the config pattern.
- Keep component public APIs explicit (no uncontrolled `any`). Prefer `SimplePokemon` / `Pokemon` interfaces found in `src/app/pokemons/interfaces`.
- Do not add client-only code into `src/server.ts` — server file is for Node/SSR responsibilities.

If anything in this file is unclear or you want more examples (tests, CI, or Netlify deploy), tell me which area and I will add short, focused examples.
