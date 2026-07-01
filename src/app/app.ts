import { Component } from '@angular/core';
import { Home } from './home/home';

@Component({
  selector: 'app-root',
  imports: [Home],
  template: `
  <main>
      <header class="brand-name">
        <img class="brand-logo" src="/logo.jpg" alt="logo" aria-hidden="true" />
      </header>
      <section class="content">
        <app-home />
      </section>
    </main>
     `,
  styleUrl: './app.scss'
})
export class App {
  title = 'default';
}
