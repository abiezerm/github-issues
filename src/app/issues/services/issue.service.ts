import { inject, Injectable, signal } from '@angular/core';
import { injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { getIssueById, getIssueCommentsById } from '../actions';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private queryClient = inject(QueryClient);
  private issueNumber = signal<string | null>(null);

  setIssueNumber(issueNumber: string) {
    this.issueNumber.set(issueNumber);
  }

  issueQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber()],
    queryFn: () => getIssueById(this.issueNumber()!),
    enabled: this.issueNumber() !== null,
    staleTime: 1000 * 60 * 5 // 5 minutes
  }));

  issueCommentsQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber(), 'comments'],
    queryFn: () => getIssueCommentsById(this.issueNumber()!),
    enabled: this.issueNumber() !== null
  }));

  prefetchIssue(issueNumber: string) {
    this.queryClient.prefetchQuery({
      queryKey: ['issue', issueNumber],
      queryFn: () => getIssueById(issueNumber),
      staleTime: 1000 * 60 * 5 // 5 minutes
    });
  }

}
