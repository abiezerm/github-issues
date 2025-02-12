import { IssueService } from './../services/issue.service';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { IssueCommentComponent } from '../components/issue-comment.component';

@Component({
  selector: 'app-issue-page',
  imports: [RouterLink, IssueCommentComponent],
  template: `
    <h1>
      Issue No: <small>{{ issueNumber() }}</small>
    </h1>
    <a routerLink="/issues">Back to Issues</a>

    @if(issueQuery.data() === undefined){
      <p>Loading...</p>
    } @else {
      <app-issue-comment [issue]="issueQuery.data()!" />
    }

    <!-- Comments -->
    @if (issueCommentsQuery.isLoading()) {
      <p>Loading comments...</p>
    } @else {
      @for (comment of issueCommentsQuery.data(); track comment.id) {
        <app-issue-comment [issue]="comment" />
      } @empty {
        <p>No comments yet</p>
      }
    }

  `,
})
export default class IssuePageComponent {
  route = inject(ActivatedRoute);
  IssueService = inject(IssueService);

  issueNumber = toSignal<string>(
    this.route.paramMap.pipe(
      map(params => params.get('id') ?? ''),
      tap((number) => this.IssueService.setIssueNumber(number))
    )
  )

  public issueQuery = this.IssueService.issueQuery;
  public issueCommentsQuery = this.IssueService.issueCommentsQuery;
}
