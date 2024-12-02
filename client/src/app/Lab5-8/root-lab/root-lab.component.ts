import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root-lab',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './root-lab.component.html',
  styleUrl: './root-lab.component.css'
})
export class RootLabComponent {

}
