import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-page',
  imports: [],
  templateUrl: './contact-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactPage implements OnInit { 
  private title = inject(Title);
  private meta = inject(Meta);
  ngOnInit(): void {
    this.title.setTitle('Contact - Pokémon SSR');
    this.meta.updateTag({
      name: 'description',
      content: 'Contact page of the Pokémon SSR application built with Angular Universal.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'Angular, Universal, SSR, Pokémon, Contact'
    });
    this.meta.updateTag({
      name: 'author',
      content: 'Camilo Guevara'
    });
    this.meta.updateTag({
      name: 'og:title',
      content: 'Contact - Pokémon SSR'
    });
    this.meta.updateTag({
      name: 'og:description',
      content: 'Contact page of the Pokémon SSR application built with Angular Universal.'
    });
  }
}

