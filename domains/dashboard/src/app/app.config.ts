import {
  ApplicationConfig,
  inject,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideApollo } from '@full-stack-nestjs-template/ng-apollo';
import { InMemoryCache } from '@apollo/client';
import { LocalStorageWrapper } from 'apollo3-cache-persist';
import { WA_WINDOW } from '@ng-web-apis/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
    provideApollo({
      link: {
        uri: '/graphql',
      },
      cache: new InMemoryCache(),
      persistence: {
        initializer: true,
        storage: () => new LocalStorageWrapper(inject(WA_WINDOW).localStorage),
      },
    }),
  ],
};
