import { Component, input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {

  ratedCount = input.required<number>();

  averageRating = input.required<number>();

}