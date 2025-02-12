import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <div class="max-w-5xl m-auto mt-5">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    `]
})
export class AppComponent {
  title = 'github-issues';
}
