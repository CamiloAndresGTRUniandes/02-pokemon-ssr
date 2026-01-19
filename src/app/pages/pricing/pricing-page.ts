import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pricing-page',
  imports: [],
  templateUrl: './pricing-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPage implements OnInit { 
  private title = inject(Title);
  private meta = inject(Meta);
  private platform = inject(PLATFORM_ID);

  ngOnInit(): void {
    //Example of platform detection usage
    if (isPlatformBrowser(this.platform)) {
      console.log('This code is running in the browser.');
    } else if (isPlatformServer(this.platform)) {
      console.log('This code is running on the server.');
    }

    this.title.setTitle('Pricing - Pokémon SSR');
    this.meta.updateTag({
      name: 'description',
      content: 'Pricing page of the Pokémon SSR application built with Angular Universal.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'Angular, Universal, SSR, Pokémon, Pricing'
    });
    this.meta.updateTag({
      name: 'author',
      content: 'Camilo Guevara'
    });
    this.meta.updateTag({
      name: 'og:title',
      content: 'Pricing - Pokémon SSR'
    });
    this.meta.updateTag({
      name: 'og:description',
      content: 'Pricing page of the Pokémon SSR application built with Angular Universal.'
    });
  }
}