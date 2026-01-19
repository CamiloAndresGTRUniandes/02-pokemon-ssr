import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about-page',
  imports: [],
  templateUrl: './about-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutPage implements OnInit { 
  private title = inject(Title);
  private meta = inject(Meta);
  ngOnInit(): void {
    this.title.setTitle('About - Pokémon SSR');
    this.meta.updateTag({
      name: 'description',
      content: 'About page of the Pokémon SSR application built with Angular Universal.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'Angular, Universal, SSR, Pokémon, About'
    });
    this.meta.updateTag({
      name: 'author',
      content: 'Camilo Guevara'
    });
    this.meta.updateTag({
      name: 'og:title',
      content: 'About - Pokémon SSR'
    });
    this.meta.updateTag({
      name: 'og:description',
      content: 'About page of the Pokémon SSR application built with Angular Universal.'
    });
  }
}
