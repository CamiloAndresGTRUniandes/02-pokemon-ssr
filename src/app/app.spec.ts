import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { Component } from '@angular/core';
import { Navbar } from './shared/components/navbar/navbar';

@Component({
  selector: 'app-navbar',
  template: '<nav>Navbar</nav>',
})
class MockNavbarComponent { }

describe('App', () => {
let fixture: ComponentFixture<App>;
let app: App;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    })
    .overrideComponent(App, {
      add: {
       imports: [MockNavbarComponent],
      },
      remove: {
        imports: [Navbar],
      },
    })
    .compileComponents();
    fixture = TestBed.createComponent(App);
    app = fixture.componentInstance as any;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should expose the title signal with default value', () => {
    const app = fixture.componentInstance as any;
    expect(typeof app.title).toBe('function');
    expect(app.title()).toBe('pokemon-ssr');
  });

  it('should render navbar and layout wrapper', async () => {
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
    expect(compiled.querySelector('div.max-w-3xl')).toBeTruthy();
  });

  it('should have router-outlet', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should match snapshot', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled).toMatchSnapshot();
  });
});
