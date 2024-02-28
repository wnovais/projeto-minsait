import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-tittle',
  standalone: true,
  imports: [],
  templateUrl: './page-tittle.component.html',
  styleUrl: './page-tittle.component.css'
})
export class PageTittleComponent {
  @Input() title:string = '';
}
