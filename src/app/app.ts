import { Component } from '@angular/core';
import { Home } from './home/home';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'default';
}
