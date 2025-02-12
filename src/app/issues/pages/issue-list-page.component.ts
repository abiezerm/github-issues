import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IssuesService } from '../services/issues.service';
import { LabelsSelectorComponent } from "../components/labels-selector.component";
import { IssueItemComponent } from "../components/issue-item.component";

@Component({
  selector: 'app-issue-list-page',
  imports: [LabelsSelectorComponent, IssueItemComponent],
  template: `
    <h1>Github Issues</h1>
    <dir class="my-5 border-b-2 border-blue-600 "></dir>
    <section class="grid grid-cols-1 sm:grid-cols-3 gap-2">

    <!-- Filter -->
      <div class=" flex flex-col col-span-3">
        <div class="flex gap-2">
          <button class="btn active">All</button>
          <button class="btn">Open</button>
          <button class="btn">Closed</button>
        </div>
      </div>

      <!-- Items -->
      <div class="mt-4 flex flex-col col-span-2">
        <h2>Issues</h2>

        <!-- TODO: list of issues -->
        @for(issue of issuesQuery.data() ?? []; track issue.id) {
          <app-issue-item [issue]="issue" />
        } @empty {
          @if(issuesQuery.isLoading()) {
            <p>Loading...</p>
          } @else {
            <p>No issues found</p>
          }
        }

        <!-- TODO: spinner -->
      </div>

      <!-- Labels -->
      <div>
          @if(labelQuery.isLoading()) {
            <p>Loading...</p>
          } @else {
            <app-labels-selector [labels]="labelQuery.data() ?? []" />
          }

          <!-- TODO: label selector -->
      </div>
    </section>


  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export default class IssueListPageComponent {
  issuesService = inject(IssuesService);

  get labelQuery() {
    return this.issuesService.labelsQuery;
  }

  get issuesQuery() {
    return this.issuesService.issuesQuery;
  }
}
