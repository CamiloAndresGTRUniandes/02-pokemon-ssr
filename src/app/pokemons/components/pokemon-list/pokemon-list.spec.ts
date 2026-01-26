import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PokemonList } from "./pokemon-list";
import { provideRouter } from "@angular/router";
import { SimplePokemon } from "../../interfaces";

const mockPokemons: SimplePokemon[] = [
  { name: 'bulbasaur', id: '1' },
  { name: 'ivysaur', id: '2' },
  { name: 'venusaur', id: '3' },
];

describe('PokemonList', () => {
  let component: PokemonList;
  let fixture: ComponentFixture<PokemonList>;
  beforeEach(async () => {
    fixture = await TestBed.configureTestingModule({
      imports: [PokemonList],
      providers: [provideRouter([])],
    }).createComponent(PokemonList);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('pokemons', mockPokemons);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render list of pokemon cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const pokemonCards = compiled.querySelectorAll('pokemon-card');
    expect(pokemonCards.length).toBe(mockPokemons.length);
  });

  it('should match snapshot', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled).toMatchSnapshot();
  });

  it('should handle empty pokemon list', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const pokemonCards = compiled.querySelectorAll('pokemon-card');
    expect(pokemonCards.length).toBe(0);
    const noDataElement = compiled.querySelector('div.col-span-5');
    expect(noDataElement).toBeTruthy();
    expect(noDataElement?.textContent?.trim()).toBe('No data available.');
  });


});
