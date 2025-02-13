import { Component, computed, inject, input } from '@angular/core';
import { GitHubIssue } from '../types';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IssueService } from '../services/issue.service';

@Component({
  selector: 'app-issue-item',
  imports: [RouterLink, CommonModule],
  template: `
    <div
      (mouseenter)="prefetchData()"
      class="flex items-center px-2 py-3 mb-5 border rounded-md bg-slate-900 hover:bg-slate-800">
      @if( isOpen ) {
      <i class="fa-regular fa-folder-open text-green-500"></i>

      } @else {
      <i class="fa-regular fa-folder-closed text-red-500"></i>

      }

      <div class="flex flex-col flex-grow px-2">
        <a [routerLink]="['/issues', issue().number]" class="hover:underline">
          {{ issue().title }}
        </a>
        <span class="text-gray-500">
          #{{ issue().number }} opened {{ since }} by
          <span class="font-bold">{{ issue().user.login }}</span>
        </span>

        <div class="flex flex-wrap mt-4">
          @for (label of issue().labels; track label.id) {
          <span
            class="px-2 py-1 mr-2 text-xs text-white rounded-md"
            [ngStyle]="{ border: '1px solid #' + label.color }"
          >
            {{ label.name }}
          </span>

          }
        </div>
      </div>

      <img
        [src]="issue().user.avatar_url"
        width="32"
        height="32"
        alt="User Avatar"
        class="w-8 h-8 rounded-full"
      />
      <div class="flex flex-col mx-2 items-center">
        <i class="fa-regular fa-message text-gray-400"></i>
        <span class="px-4 text-gray-400">{{ issue().comments }}</span>
      </div>
    </div>
  `,
})
export class IssueItemComponent {
  issue = input.required<GitHubIssue>();
  issueService = inject(IssueService);

  // since = new Date(this.issue().created_at).toLocaleDateString();

  //isOpen = computed(() => this.issue().state === "open");

  prefetchData() {
    this.issueService.prefetchIssue(this.issue().number.toString());
  }

  get isOpen() {
    return this.issue().state === "open";
  }

  get since() {
    return "";
  }
}
