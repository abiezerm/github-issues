import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideTanStackQuery, QueryClient, withDevtools } from '@tanstack/angular-query-experimental'
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideMarkdown } from 'ngx-markdown';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideTanStackQuery(new QueryClient(), withDevtools()),
    provideMarkdown()
  ]
};
