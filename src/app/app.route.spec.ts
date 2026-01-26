import { provideRouter, Route, Router } from '@angular/router';
import { routes } from './app.routes';
import { TestBed } from '@angular/core/testing';
import AboutPage from './pages/about/about-page';
import PokemonsPage from './pages/pokemons/pokemons-page';

describe('App Routes', () => {
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });
    router = TestBed.inject(Router);
    // location = TestBed.inject(Location);
  });

  it('should be defined', () => {
    expect(routes).toBeDefined();
    expect(routes.length).toBe(6);
  });

  it('should contain all defined routes', () => {
    expect(routes.length).toBe(6);
  });

  it('should render AboutPageComponent when path is /about', async () => {
    const aboutRoute: Route | undefined = routes.find(r => r.path === 'about');
    expect(aboutRoute).toBeDefined();
    expect(aboutRoute?.loadComponent).toBeDefined();

    const component = await aboutRoute?.loadComponent!() as any;
    expect(component).toBeDefined();
    expect(component.default).toBe(AboutPage);
  });

  it('should navigate to "/about" and render AboutPageComponent', async () => {
    await router.navigate(['/about']);
    expect(router.url).toBe('/about');
    const aboutRoute: Route | undefined = routes.find(r => r.path === 'about');
    const component = await aboutRoute?.loadComponent!() as any;
    expect(component.default).toBe(AboutPage);
  });

  it('should render PricingPageComponent when path is /pricing', async () => {
    await router.navigate(['/pricing']);
    expect(router.url).toBe('/pricing');
    const pricingRoute: Route | undefined = routes.find(r => r.path === 'pricing');
    expect(pricingRoute).toBeDefined();
    expect(pricingRoute?.loadComponent).toBeDefined();
  });

  it('should navigate to "/pokemons/page/1" and render PokemonsPageComponent', async () => {
    await router.navigate(['/pokemons/page/1']);
    expect(router.url).toBe('/pokemons/page/1');
    const pokemonsPageRoute: Route | undefined = routes.find(r => r.path === 'pokemons/page/:page');
    expect(pokemonsPageRoute).toBeDefined();
    expect(pokemonsPageRoute?.loadComponent).toBeDefined();
  });

  it('should render PokemonsPageComponent when path is /pokemons/page/:page', async () => {
    const pokemonsPageRoute: Route | undefined = routes.find(r => r.path === 'pokemons/page/:page');
    expect(pokemonsPageRoute).toBeDefined();
    expect(pokemonsPageRoute?.loadComponent).toBeDefined();
    const component = await pokemonsPageRoute?.loadComponent!() as any;
    expect(component).toBeDefined();
    expect(component.default).toBe(PokemonsPage);
  });

  it('should redirect to /about when path is unknown', async () => {
    await router.navigate(['/unknown']);
    expect(router.url).toBe('/about');
    const aboutRoute: Route | undefined = routes.find(r => r.path === 'about');
    expect(aboutRoute).toBeDefined();
    const component = await aboutRoute?.loadComponent!() as any;
    expect(component.default).toBe(AboutPage);
  });
});
