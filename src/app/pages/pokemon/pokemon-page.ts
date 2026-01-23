import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pokemon-page',
  imports: [],
  templateUrl: './pokemon-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPage { }
