import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GithubLabel } from '../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labels-selector',
  imports: [CommonModule],
  template: `
    <div class="flex flex-wrap justify-center items-center gap-2">
      @for (label of labels(); track label.id) {
        <div
          class="border p-2 rounded-md hover:bg-slate-950 cursor-pointer"
          [ngStyle]="{'border-color': '#' + label.color}" >
          {{ label.name }}
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelsSelectorComponent {
  labels = input.required<GithubLabel[]>();
}
