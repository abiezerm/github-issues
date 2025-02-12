import { Injectable, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getIssueById, getIssueCommentsById } from '../actions';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private issueNumber = signal<string | null>(null);

  setIssueNumber(issueNumber: string) {
    this.issueNumber.set(issueNumber);
  }

  issueQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber()],
    queryFn: () => getIssueById(this.issueNumber()!),
    enabled: this.issueNumber() !== null
  }));

  issueCommentsQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber(), 'comments'],
    queryFn: () => getIssueCommentsById(this.issueNumber()!),
    enabled: this.issueNumber() !== null
  }));

}
