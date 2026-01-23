import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'pokemon-list-skeleton',
  imports: [],
  templateUrl: './pokemon-list-skeleton.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListSkeleton {}
