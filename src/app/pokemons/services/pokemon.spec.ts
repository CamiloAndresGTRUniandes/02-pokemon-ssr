import { TestBed } from '@angular/core/testing';
import { Pokemons as PokemonsService } from './pokemons';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PokeAPIResponse, SimplePokemon } from '../interfaces';

const mockPokeApiResponse: PokeAPIResponse = {
  count: 1302,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  previous: null,
  results: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
  ],
};

const expectedPokemons: SimplePokemon[] = [
  { id: '1', name: 'bulbasaur' },
  { id: '2', name: 'ivysaur' },
];

const mockPokemon = {
  id: 1,
  name: 'bulbasaur',
} as any;

describe('PokemonService', () => {
  let service: PokemonsService;
  let httpMock: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    service = TestBed.inject(PokemonsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should load a page of pokemons', () => {
    service.loadPage(1).subscribe((pokemons) => {
      expect(pokemons).toEqual(expectedPokemons);
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
    expect(req.request.method).toBe('GET');
    req.flush(mockPokeApiResponse);

  });

  it('should load page 5 of pokemons', () => {
    service.loadPage(5).subscribe((pokemons) => {
      expect(pokemons).toEqual(expectedPokemons);
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?offset=80&limit=20');
    expect(req.request.method).toBe('GET');
    req.flush(mockPokeApiResponse);

  });

  it('should load a pokemon by ID', () => {
    service.getPokemonById('1').subscribe((pokemon) => {
      expect(pokemon).toEqual(mockPokemon);
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemon);
  });

  it('should load a pokemon by Name', () => {
    service.getPokemonById('bulbasaur').subscribe((pokemon) => {
      expect(pokemon).toEqual(mockPokemon);
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/bulbasaur');
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemon);
  });

  it('should catch error if API fails', () => {
    service.getPokemonById('unknown').subscribe({
      next: () => {
        throw new Error('should have failed with 404 error');
      },
      error: (error) => {
        expect(error.status).toBe(404);
      },
    });
    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/unknown');
    //expect(req.request.method).toBe('GET');
    req.flush('Not Found', { status: 404, statusText: 'Not Found' });
  });


});
