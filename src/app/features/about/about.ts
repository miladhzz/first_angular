import { Component } from '@angular/core';
import {MatSlideToggle} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MatSlideToggle],
  templateUrl: './about.html',
})
export class AboutPage {}
