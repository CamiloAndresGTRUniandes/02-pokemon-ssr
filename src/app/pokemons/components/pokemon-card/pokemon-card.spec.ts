import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PokemonCard } from "./pokemon-card";
import { provideRouter, RouterLink } from "@angular/router";
import { SimplePokemon } from "../../interfaces";
import { By } from "@angular/platform-browser";

const mockPokemon: SimplePokemon = {
  name: 'bulbasaur',
  id: '1',
};

describe('PokemonCard', () => {
  let component: PokemonCard;
  let fixture: ComponentFixture<PokemonCard>;

  beforeEach(async () => {
    fixture = await TestBed.configureTestingModule({
      imports: [PokemonCard],
      providers: [provideRouter([])],
    }).createComponent(PokemonCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('pokemon', mockPokemon);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have pokemonImageUrl computed property', () => {
    expect(component.pokemonImageUrl).toBeDefined();
    expect(component.pokemonImageUrl())
      .toBe(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`);
  });

  it('should log effects on initialization', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    component.logEffects();
    expect(consoleSpy).toHaveBeenCalledWith('PokemonCard - logEffects called for:', mockPokemon);
    consoleSpy.mockRestore();
  });

  it('should match snapshot', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled).toMatchSnapshot();
  });

  it('should render pokemon name and image correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const imgElement = compiled.querySelector('img');
    const nameElement = compiled.querySelector('h2');
    expect(imgElement).toBeTruthy();
    expect(imgElement?.getAttribute('src'))
      .toBe(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`);
    expect(imgElement?.getAttribute('alt')).toBe(mockPokemon.name);
    expect(nameElement).toBeTruthy();
    expect(nameElement?.textContent?.trim()).toBe(mockPokemon.name);
  });

  it('should update pokemon input correctly', () => {
    const newPokemon: SimplePokemon = { name: 'charmander', id: '4' };
    fixture.componentRef.setInput('pokemon', newPokemon);
    fixture.detectChanges();
    expect(component.pokemon()).toEqual(newPokemon);
    expect(component.pokemonImageUrl())
      .toBe(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${newPokemon.id}.png`);
  });

  it('should have the correct routeLink configured', () => {
    const debugElement = fixture.debugElement.query(By.directive(RouterLink));
    const routerLinkInstance = debugElement.injector.get(RouterLink) as RouterLink;
    expect(routerLinkInstance).toBeTruthy();
    expect(routerLinkInstance.urlTree?.toString()).toBe(`/pokemons/${mockPokemon.name}`);
  });
});
