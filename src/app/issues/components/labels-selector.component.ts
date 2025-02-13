import { Label } from './../types/github-issue.type';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { GithubLabel } from '../types';
import { CommonModule } from '@angular/common';
import { IssuesService } from '../services/issues.service';

@Component({
  selector: 'app-labels-selector',
  imports: [CommonModule],
  template: `
    <div class="flex flex-wrap justify-center items-center gap-2">
      @for (label of labels(); track label.id) {
        <div
          (click)="onToggleLabel(label.name)"
          [class.selected-label]="isSelected(label.name)"
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
  issuesService = inject(IssuesService);
  labels = input.required<GithubLabel[]>();

  isSelected(labelName: string) {
    return this.issuesService.selectedLabels().has(labelName);
  }

  onToggleLabel(label: string) {
    this.issuesService.toggleLabel(label);
  }
}
