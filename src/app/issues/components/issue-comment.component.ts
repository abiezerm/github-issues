import { MarkdownModule } from 'ngx-markdown';
import { Component, input } from '@angular/core';
import { GitHubIssue } from '../types';

@Component({
  selector: 'app-issue-comment',
  imports: [MarkdownModule],
  template: `
    <div class="w-full">
      <div class="border border-gray-200 mt-2 rounded-md shadow-sm">
        <div class="flex items-center bg-blue-500 text-white p-2 rounded-t-md">
          <img
            [src]="issue().user.avatar_url"
            alt="User avatar"
            class="w-8 h-8 rounded-full"
          />
          <span class="ml-2">{{ issue().user.login }}</span>
        </div>

        <div class="p-2 bg-gray-700 text-white">
          <markdown>{{ issue().body }}</markdown>
      </div>
    </div>
  `,
})
export class IssueCommentComponent {
  issue = input.required<GitHubIssue>();
}
